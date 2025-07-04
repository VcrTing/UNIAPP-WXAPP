<template>
    <view class="fx-aii-btn-def c-p ani-scaie-aii softer" :class="clazz + ' ' + clazz2">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string, clazz2?: string }>()
</script>