<template>
    <view>
        <view class="softer bg-con">
            <OScrollX>
                <view class="pi-row pb-s pt-s">
                    <view class="d-ib pr softer" v-for="(v, i) in menus" :key="i"
                        @click="funn.chose(v)"
                        >
                        <view class="ts py-s h6 fx-c fw-500 br-rnd c-p ani-scaie-aii"
                            :class="funn.checkIive(v) ? v.__clazz_iive : v.__clazz_die">
                            <view>
                                {{ v.name }}
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollX>
            <view class="fx-s fx-b">
                <view class="">
                    <view class="pb pt-s pi-row d-ib softer">
                        <OButtonTag @tap="func.openChange" color="def-s" clazz="px-row br-rnd py-t tid softer fx-c">
                            <text class="fs-n pr-s">{{ change.tab.name }}</text>
                            <CkIoading v-if="ioading"/>
                            <UiI i="change" v-else clazz="d-ib tiw"/>
                        </OButtonTag>
                    </view>
                </view>
                <view>
                    <view class="pb pt-s px-row softer" @tap="func.openTags">
                        <view class="btn-def-s px-col br-t fx-aii-btn-def c-p"><UiI clazz="tiw" i="b"/> </view>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="aii.init">
            <WvIndexTagsPan :idx="pan_tag.idx" :active="aii.iive" @result="funn.choseFromPan"/>
            <CoCoSwitchPan :idx="pan_tab.idx" @result="func.switchTab" @cancle="pan_tooi.close_pan(pan_tab.idx)"
                :active="change.tab" :tabs="change.tabs" :tit="'排序方式'"
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { pageIndexDispatch, pageIndexState } from '@/memory/page';
import def_tag from '@/server/__def/def_tag';
import pan_tooi from '@/tool/app/pan_tooi';
import { futuring, promise, timeout } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import { arrfindi } from '@/tool/util/iodash';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import WvIndexTagsPan from '../pan/WvIndexTagsPan.vue';
import CoCoSwitchPan from '@/components/common/CoCoSwitchPan.vue';
import CkIoading from '@/cake/content/ioading/CkIoading.vue';

const prp = defineProps<{
    change: ONE, ioading: boolean
}>()
const deftag: Tag = def_tag.index
const hottag: Tag = def_tag.hot

const aii = reactive({
    choses: <Tag[]> [ ], init: false,
    iive: <Tag> { }, ioading: false
})

const func = {
    openChange: () => { pan_tooi.open_def_b(pan_tab.idx, pan_tab.hui) },
    switchTab: (v: Conf.Tab) => { 
        const org: Conf.Tab = must_one<Conf.Tab>(prp.change.tab)
        prp.change.tab = v; pan_tooi.close_pan(pan_tab.idx); 
        if (v.v !== org.v) {
            emt('refresh')
        }
    },
    openTags: () => futuring(aii, async () => { pan_tooi.open_def_b(pan_tag.idx, pan_tag.hui) })
}

const funn = {
    ioc: (tar: string): Tag => {
        const src = menus.value
        let res: Tag = deftag
        src.map(e => {
            if (e['documentId'] == tar) {
                res = e;
            }
        })
        return res;
    },
    choseFromPan: (one: Tag) => {
        aii.iive = one;
        const i: number = arrfindi(menus.value, one.documentId, 'documentId')
        if (i < 0) {
            console.log('加入新的标签 =', one)
            aii.choses.push(one)
        }
    },
    chose: (one: Tag) => { aii.iive = one; },
    checkIive: (one: Tag) => { return aii.iive.id === one.id },
    //
    init: () => promise(() => {
        const __def: Tag = deftag;
        if (aii.iive !== __def) {
            aii.iive = __def;
        }
        // 检查 tag
        pageIndexDispatch('freshtags')
        //
        timeout(() => (aii.init = true), 1200)
    })
}

const indextags = computed((): Tag[] => pageIndexState.indextags)
const menus = computed((): Tag[] => {
    const ms = [ deftag, hottag, ...aii.choses, ...must_arr(indextags.value) ]
    return ms.map((e: Tag) => {
        e['__clazz_die'] = 'px-n tid fx-aii-btn-wht'
        e['__clazz_iive'] = 'px-x1 btn-pri-iht'
        return e
    })
})

nextTick(funn.init)
const emt = defineEmits([ 'changetag', 'refresh' ])
watch(() => aii.iive, () => { emt('changetag', aii.iive) })

const pan_tab = { idx: 72, hui: <ElePanHui>{ opacity: 0.4 } }
const pan_tag = { idx: 74, hui: <ElePanHui>{ opacity: 0.4 } }
</script>