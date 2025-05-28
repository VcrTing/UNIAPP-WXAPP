<template>
    <view :weak="true">
        <view class="">
            <view class="ta-c pb-s">
                <view class="h3 fw-550">{{ num }}</view>
            </view>
            <view class="tid"><slot></slot></view>
        </view>
    </view>
</template>

<script setup lang="ts">

const prp = defineProps<{
    num: number
}>()

</script>