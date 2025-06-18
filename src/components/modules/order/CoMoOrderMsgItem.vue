<template>
    <view>
        <view class="fx-i fx-aii-btn-def  px-x1">
            <view class="w-25 pr h7">
                <slot name="i"></slot>
            </view>
            <view class="pi-s fx-1 ta-r" :class="clazz_r">
                <slot name="r"></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    clazz_r?: string
}>()

</script>