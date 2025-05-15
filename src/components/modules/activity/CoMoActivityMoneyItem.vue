<template>
    <view class="fx-s px-row ele-price-item py br-s">
        <view class="fx-1 fx-i" @tap="emt('chose', item)">
            <view class="h4 fw-800 ele-price-num">{{ item.price }}</view>
            <view class="pi">
                <view class="h6 pb-s fw-550">{{ item.name }}</view>
                <view class="">{{ item.description }}</view>
            </view>
        </view>
        <view class="pi-row">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    item: ONE,
}>()

const emt = defineEmits([ 'chose' ])
</script>