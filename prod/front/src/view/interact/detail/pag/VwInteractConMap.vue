<template>
    <view class="py-row">
        <view class="w-100 h-30vh">
            <image mode="aspectFill" class="uni-img w-100 h-100"
                :src="mock_orders.mapimg"/>
        </view>
        <view>
            <view class="fx-i h6 py-row px-row">
                <view><UiI :i="'addr'"/></view>
                <view class="pi-row">{{ item.addr.address }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import mock_user from '@/server/mock/user/mock_user';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    item: ONE
}>()

</script>