<template>
    <view>
        <view class="fx-s py">
            <view class="fx-1 fx-i fx-t">
                <UiI class="h6" :i="'time'"/>
                <view class="pi-x1 fx-1">
                    <view class="pb-x1 fx-i">
                        <text class="fs-n">{{ activity_tool.getweek(one) }}</text>
                        <text class="pi-s">{{ activity_tool.gettime_start(one) }}</text>
                        <text class="px-s">-</text>
                        <text>{{ activity_tool.gettime_end(one) }}</text>
                    </view>
                    <view class="h-1 bg-hr"></view>
                </view>
            </view>
            <view></view>
        </view>
        <view class="fx-s pb">
            <view class="fx-1 fx-i">
                <UiI class="h6" :i="'addr'"/>
                <view class="pi-x1 d-ib">
                    <text>{{ activity_tool.getfar(one) }}</text>
                    <text class="pi-s">{{ activity_tool.getaddress(one) }}</text>
                </view>
            </view>
            <view class="pt-s">
                <image class="w-2em h-2em br-cir" mode="aspectFill" :src="mock_orders.mapimg"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import activity_tool from '@/tool/modules/activity_tool';
import { must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

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