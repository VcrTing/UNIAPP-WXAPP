<template>
    <view>
        <view v-if="top && top.id" class="softer">
            <view class="px-row"><view class="px-col"><view class="h-1 bg-hr-s"></view></view></view>
            <CoMoAdInfoLine @tap="funn.look">
                <OButton :weak="true" color="pri" clazz="br-1"><text class="fs-s">公告</text></OButton>
                <view class="pi-n pr-s fx-i ta-i fx-1 eiies">
                    <text class="eiies">{{ top.title }}&nbsp;{{ top.content ? (': ' + top.content) : '' }}</text>
                </view>
                <view class="fs-s">
                    <OFI clazz="" i="r"/>
                </view>
            </CoMoAdInfoLine>
        </view>
        <view v-else>
            <view v-if="is_publisher">
                <view class="px-row"><view class="px-col"><view class="h-1 bg-hr-s"></view></view></view>
                <CoMoAdInfoLine @tap="funn.look">
                    <OButton color="def">
                        <OFI i="+" clazz="tiw"/>
                    </OButton>
                    <view class="px">
                        <view><text class="tid">新增一条公告</text></view>
                    </view>
                </CoMoAdInfoLine>
            </view>
        </view>
        <!-- -->
        <OPan :idx="pan.idx" v-if="aii.init">
            <OPanInnerY :idx="pan.idx" :orientation="'b'" :close="true">
                <view class="pt-s">
                    <view class="h5 px-row pt pb-s fw-550">
                        <view class="px-col fx-c">
                            <text v-if="is_publisher">
                                <text v-if="iscreated">新增</text>
                                <text v-else>编辑</text>
                            </text>
                            <text>公告</text>
                        </view>
                    </view>
                    <view class="py-s">
                        <view class="h6">
                            <view class="py" v-if="aii.isedit">
                                <view class="px-inp fs-s sus">公告标题</view>
                                <input class="inp-app h7" v-model="form.title" placeholder="请输入公告标题"/>
                            </view>
                            <view class="py px-inp fx-aii-btn-def" v-else><text>{{ top.title }}</text></view>
                        </view>
                        <view class="tid h9">
                            <view class="py-s" v-if="aii.isedit">
                                <view class="px-inp fs-s sus">公告内容</view>
                                <textarea class="inp-app py" v-model="form.content" placeholder="请输入公告的内容，200字以内。"/>
                            </view>
                            <view class="py px-inp fx-aii-btn-def" v-else><text>{{ top.content }}</text></view>
                        </view>
                    </view>
                    <view class="pt px-row">
                        <view class="h9 px-col">
                            <view class="h8 py">
                                <text>发布时间</text>
                            </view>
                        </view>
                    </view>
                    <view class="px-row fx-aii-btn-def">
                        <view class="py px-col tid">
                            <text v-if="top && top.id">{{ times.fmts(top.createdAt, times.__FMT_CN) }}</text>
                            <text v-else>无&nbsp;</text>
                        </view>
                    </view>
                </view>
                <CkSpace :h="1"/>
                <view class="pt px-inp" v-if="aii.isedit">
                    <view><OButton @tap="funn.submit" clazz="btn-app">提交</OButton></view>
                </view>
                <view v-else class="py"></view>
                <CkSpace :h="1"/>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import server_notice from '@/server/msg/server_notice';
import { futuring, promise, timeout } from '@/tool/util/future';
import { arrsort } from '@/tool/util/iodash';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';
import CoMoAdInfoLine from '../component/CoMoAdInfoLine.vue';
import OFI from '@/cake/button/i/OFI.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import times from '@/tool/web/times';
import CkSpace from '@/cake/content/CkSpace.vue';
import UiI from '@/ui/element/i/UiI.vue';
import { tipsucc, tipwarn } from '@/tool/uni/uni-global';
import { authGetters } from '@/memory/global';

const prp = defineProps<{ one: Activity, is_publisher: boolean }>()

const aii = reactive({ ioading: false, noices: <ActivityNotice[]> [ ], init: false, isedit: false })
const form = reactive({ title: '', content: '', activityId: '', publisherId: '' })
const top = computed((): ActivityNotice => {
    let src: ActivityNotice[] = aii.noices || [ ]
    if (is_nice_arr(src)) {
        src = arrsort(src, 'isTop')
        return must_arr(src)[0]
    }
    return <ActivityNotice> { }
})

const funn = {
    submit: () => futuring(aii, async() => {
        if (!form.title || form.title.length < 4) {
            tipwarn('请输入4个字以上的公告标题。')
            return false
        }
        let notice: ActivityNotice | undefined = undefined
        if (iscreated.value) {
            form.activityId = prp.one.documentId
            form.publisherId = authGetters.userid + ''
            notice = await server_notice.plus(form)
        }
        else {
            notice = await server_notice.edit(top.value.documentId, form.title, form.content)
        }
        if (notice && notice.id) {
            tipsucc('公告修改成功！')
            pan_tooi.close_pan(pan.idx)
            await funn.fetching()
        }
    }),
    look: () => promise(() => {
        if (prp.is_publisher) {
            aii.isedit = true;
            form.title = top.value.title
            form.content = top.value.content
        }
        pan_tooi.open_def_b(pan.idx, pan.hui)
    }),
    fetching: () => futuring(aii, async () => {
        const nss: ActivityNotice[] = await server_notice.by_activity(prp.one);
        if (nss && nss.length > 0) {
            aii.noices = nss || [ ]
        }
        timeout(() => (aii.init = true))
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)

const pan = { idx: 41, hui: <ElePanHui>{ opacity: 0.4 } }

const iscreated = computed((): boolean => {
    const hasone: boolean = (top.value && top.value.id) ? true : false
    return prp.is_publisher && !hasone
})
</script>