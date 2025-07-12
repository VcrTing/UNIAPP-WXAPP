<template>
    <view class="fx-aii-btn-def">
        <view class="fx-s px-inp py mxw-pc"
            :class="clazz"
        >
            <view>
                <text class="pr-x1">{{ tit }}</text>
            </view>
            <view class="fx-1 fx-r ta-r">
                <slot></slot>
            </view>
        </view>
    </view>

</template>

<script setup lang="ts">
defineProps<{ tit?: string, clazz?: string }>()
</script>