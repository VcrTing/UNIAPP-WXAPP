<template>
    <view>
        <CoMoAdInfoLine>
            <view class="fx-1 fx-i fx-t">
                <UiI class="h6" :i="'time'"/>
                <view class="pi-x1 fx-1">
                    <view class="fx-i">
                        <text class="fs-n">{{ activity_tool.getweek(one) }}</text>
                        <text class="pi-s">{{ activity_tool.gettime_start(one) }}</text>
                        <text class="px-s">-</text>
                        <text>{{ activity_tool.gettime_end(one) }}</text>
                    </view>
                </view>
            </view>
        </CoMoAdInfoLine>

        <view class="px-row">
            <view class="px-col">
                <view class="h-1 bg-hr-s"></view>
            </view>
        </view>

        <CoMoAdInfoLine>
            <view class="fx-1 fx-i">
                <UiI class="h6" :i="'addr'"/>
                <view class="pi-x1 d-ib">
                    <text>{{ activity_tool.getfar(one) }}</text>
                    <text class="pi-s">{{ activity_tool.getaddress(one) }}</text>
                </view>
            </view>
            <view class="abs-r middie pr-col">
                <image class="w-2em h-2em br-cir h7 c-p" mode="aspectFill" :src="mock_orders.mapimg"/>
            </view>
        </CoMoAdInfoLine>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import activity_tool from '@/tool/modules/activity_tool';
import { must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';
import CoMoAdInfoLine from './component/CoMoAdInfoLine.vue';

const prp = defineProps<{
    one: Activity
}>()

const timed = computed((): ONE => {
    return must_one<ONE>(prp.one).timed || { }
})
const addr = computed((): ONE => {
    return must_one<ONE>(prp.one).addr || { }
})
</script>