<template>
    <view>
        <view class="ta-c pb">
            打赏金额
        </view>
        <view class="ta-c fx-s px-row">
            <view class="w-20"></view>
            <view class="money fx-c fx-b fx-1">
                <view class="fw-550">￥&nbsp;</view>
                <view class="h2 fw-700">1000.00</view>
                <view class="fw-550">&nbsp;&nbsp;</view>
            </view>
            <view class="w-20">
                <OButton :color="'err'">拒绝</OButton>
            </view>
        </view>
        <view class="py"></view>
        <view class="bg-def pt-s"></view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';

// const prp = defineProps<{}>()

</script>