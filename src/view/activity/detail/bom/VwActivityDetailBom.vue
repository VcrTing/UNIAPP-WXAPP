<template>
    <view class="w-100 softer">
        <view class="softer" v-if="ispublisher">
            <CoBomBackBtn :clazz="'btn-wht-s'"/>
        </view>
        <view v-else class="">
            <view class="w-100 bg-con softer abs-b i-0 ps-f-imp">
                <view class="fx-s mxw-pc">
                    <view class="fx-1 fx-i">
                        <Ov clazz="ta-c pt-s pb-s" @tap="uniRouter.back">
                            <view class="px-x2 h-1em h8">
                                <UiI i="i" clazz=""/>
                            </view>
                            <view class="tis pt-s"><text class="fs-s">返回</text></view>
                        </Ov>
                        <Ov clazz="ta-c pt-s pb-s" @tap="funn.share">
                            <view class="px-x2 h-1em h8">
                                <UiI i="share" clazz=""/>
                            </view>
                            <view class="tis pt-s"><text class="fs-s">分享</text></view>
                        </Ov>
                    </view>
                    <view class="px-row w-618">
                        <OButton v-if="isjoin" clazz="btn-app"
                            color="def" @tap="uniRouter.back"
                        >
                            <text class="">您已经报名</text>
                        </OButton>
                        <view v-else class="softer">
                            <OButton
                                :ioading="aii.ioading"
                                clazz="btn-app mh-btn-x1" @tap="funn.join">
                                <view class="">
                                    <text class="">
                                        <text class="h8">￥</text>
                                        <text class="h7 fw-550">{{ one.fee || 0 }}</text>
                                        <text>元，</text>
                                    </text>
                                    <text>加入</text>
                                </view>
                            </OButton>
                        </view>
                    </view>
                </view>
            </view>
            <CkSpace :h="8"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import Ov from '@/cake/button/touch/Ov.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import { orderReFresh } from '@/memory/global';
import activity_tool from '@/tool/modules/activity_tool';
import auth_tool from '@/tool/modules/common/auth_tool';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

const prp = defineProps<{ 
    one: Activity, 
    user: User, 
    isjoin: boolean,
    isinvited: boolean,
    ispublisher: boolean
}>()

const aii = reactive({
    ioading: false
})

const funn = {
    submit: async () => {
        const order = {
            one: prp.one,
            joiner: prp.user,
            msg: {
                createTime: new Date(),
            }
        }
        orderReFresh('order_of_place', order); uniRouter.gopg('activity_order')
    },
    vid: () => {
        const newset: Activity = prp.one || { }
        const startTime = newset.startTime
        const isbg = times.bigger(startTime)
        if (!isbg) {
            tipwarn('该活动已经开始了，无法在报名参加了。')
            return false;
        }
        const less: number = activity_tool.getjoin_remaining(newset)
        if (less <= 0) {
            tipwarn('该活动太火爆，已经满员了。')
            return false;
        }
        return true;
    },
    join: () => auth_tool.doac(async () => {
        if (funn.vid()) {
            funn.submit()
        }
    }),
    //
    share: () => {
        console.log('SHARE')
    }
}
</script>