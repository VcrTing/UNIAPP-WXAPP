<template>
    <view class="" :class="clazz">
        <view class="ta-c">
            <view class=" pb-s">
                <view class="h3 fw-550">{{ num || 0 }}</view>
            </view>
            <view class="tid"><slot></slot></view>
        </view>
    </view>
</template>

<script setup lang="ts">

const prp = defineProps<{
    num: number,
    clazz?: string
}>()

</script>