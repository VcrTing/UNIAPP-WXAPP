<template>
    <view>
        <view class="fx-i fx-aii-btn-def px-x1" :class="clazz">
            <view class="w-25 pr">
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
    clazz?: string
    clazz_r?: string
}>()

</script>