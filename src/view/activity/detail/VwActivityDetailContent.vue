<template>
    <view>
        <view class="py h6 fw-550">详情</view>
        <view class="pt-s ">
            <view v-for="(v, i) in contents" :key="i">
                <view class="py-s">{{ v.txt }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import { computed } from 'vue';

const prp = defineProps<{
    one?: ONE
}>()

const contents = computed(() => {
    return mock_orders.content
})
</script>