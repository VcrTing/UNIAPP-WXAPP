<template>
    <view class="fx-s px-inp fx-aii-btn-def py"
        :class="clazz"
    >
        <view>
            <text class="pr-x1">{{ tit }}</text>
        </view>
        <view class="fx-1 fx-r ta-r">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{ tit?: string, clazz?: string }>()
</script>