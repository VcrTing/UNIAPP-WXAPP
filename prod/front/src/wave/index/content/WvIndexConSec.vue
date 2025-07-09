<template>
    
    <view class="fx-s fx-b">
        <view class="">
            <view class="pb pt-s pi-row d-ib">
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
        <view v-if="aii.init">
            <WvIndexTagsPan :idx="pan_tag.idx" :active="aii.iive" @result=""/>
            <CoCoSwitchPan :idx="pan_tab.idx" @result="func.switchTab"
                :active="change.tab" :tabs="change.tabs" :tit="'排序方式'"
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CkIoading from '@/cake/content/ioading/CkIoading.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import { futuring, timeout } from '@/tool/util/future';
import { reactive } from 'vue';
import WvIndexTagsPan from '../pan/WvIndexTagsPan.vue';
import CoCoSwitchPan from '@/components/common/CoCoSwitchPan.vue';
import { arrfindi } from '@/tool/util/iodash';

const prp = defineProps<{
    change: ONE, ioading: boolean
}>()

const aii = reactive({
    choses: <Tag[]> [ ], init: false,
    iive: <Tag> { }, ioading: false
})

const func = {
    openChange: () => { pan_tooi.open_def_b(pan_tab.idx, pan_tab.hui) },
    switchTab: (v: Conf.Tab) => { prp.change.tab = v; pan_tooi.close_pan(pan_tab.idx) },
    openTags: () => futuring(aii, async () => { pan_tooi.open_def_b(pan_tag.idx, pan_tag.hui) }),
  
}

const funn = {
    
    init: () => futuring(aii, async () => {
        timeout(() => (aii.init = true), 2200)
    })
}

const pan_tab = { idx: 72, hui: <ElePanHui>{ opacity: 0.4 } }
const pan_tag = { idx: 74, hui: <ElePanHui>{ opacity: 0.4 } }
</script>