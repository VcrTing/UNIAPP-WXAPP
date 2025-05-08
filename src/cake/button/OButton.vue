<template>
    <view class="d-ib">
        <view
            class="btn br bd btn-pri tils py-s px-btn mh-btn fx-c"
            :class="clazz"
            >
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string, clazz_text?: string }>()
</script>
