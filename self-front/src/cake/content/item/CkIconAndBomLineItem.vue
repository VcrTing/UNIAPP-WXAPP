<template>
    <view class="fx-s">
        <view>
            <view>
                <slot name="i"></slot>
            </view>
            <view class="pt-x2"></view>
            <view class="h-1"></view>
        </view>
        <view class="fx-1 pi">
            <view>
                <slot name="con"></slot>
            </view>
            <view class="pt-x2"></view>
            <view class="h-1 bg-hr"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()

</script>