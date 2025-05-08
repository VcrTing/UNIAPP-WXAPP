
<template>
    <view class="d-ib">
        <view
            class="btn br bd btn-pri-iht tils py-s px-btn mh-btn fx-c w-100"
            :class="clazz"
            >
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string }>()
</script>

