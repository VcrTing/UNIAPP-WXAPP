<template>
    <view class="ta-c py-s w-100 fx-aii-btn-def br-t btn"
        :class="iive ? (clazz_iive ? clazz_iive : 'btn-def') : 'btn-def'"
        >
        <text class="fs-w">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    iive: boolean,
    clazz_iive?: string
}>()
</script>