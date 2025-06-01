<template>
    <view>
        <view>
            <view class="fx-r py-s">
                <view class="fx-r fx-aii-btn-def" @tap="funn.openfilter">
                    <text class="pr-s py-row pi-x1 tit">
                        {{ aii.range[aii.value].text }}
                    </text>
                    <OFI clazz="pr-row py-row" :i="'b'"/>
                </view>
            </view>
        </view>
        <view class="px-row">
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishViewItem :v="v"/>
            </view>
        </view>

        <OPan :idx="pan.idx">
            <OPanInnerY :idx="pan.idx" :orientation="'b'">
                <view class="py-x2">
                    <view class="fx-c"><text class="header-s ls">选择过滤</text></view>
                </view>
                <view class="px-row">
                    <view>
                        <view class="py-s" v-for="(v, i) in aii.range" :key="i"
                            @tap="funn.changefilter(v, i)"
                        >
                            <view class="py px ta-c fx-aii-btn-def br-1"
                                :class="aii.value == i ? 'bg-def' : ''"
                            >{{ v.text }}</view>
                        </view>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OFI from '@/cake/button/i/OFI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import pan_tooi from '@/tool/app/pan_tooi';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

const pan = { idx: 20, hui: <ElePanHui>{ opacity: 0 } }

// const prp = defineProps<{}>()
const aii = reactive({
    items: mock_publish.history,
    
    range: [
        { value: 0, text: "全部" },
        { value: 2, text: "已完成" },
        { value: 1, text: "已取消" },
    ],
    value: 0,
})

const funn = {
    changefilter: (v: ONE, i: number) => {
        aii.value = i;
        pan_tooi.close_pan(pan.idx)
    },
    openfilter: () => {
        pan_tooi.open_def_b(pan.idx)
    }
}
</script>