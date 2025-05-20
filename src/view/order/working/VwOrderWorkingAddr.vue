<template>
    <view class="">
        <view class="bg-con br o-h">
            <view class="fx-i py-row px-row">
                <view class="">
                    <UiI :i="'time'" class="d-ib"/>
                    <view class="d-ib pi-s">{{ one.timed.start }}</view>
                    <view class="d-ib pi">{{ one.timed.startText }}</view>
                </view>
            </view>
            <view class="fx-c py fx-b">
                <view class="h4 fx-c fw-800 pri">
                    <text class="h3">120</text>
                    <text class="pi-s">分钟</text>
                </view>
                <view class="pi pri">后开始</view>
            </view>
            <view>
                <image mode="aspectFill" class="w-100 h-24vh" :src="mock_orders.mapimg"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    item: OrderItem
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const tags = computed(() => must_arr(one.value.tags))
const publisher = computed(() => must_one<ONE>(one.value).publisher || { })
</script>