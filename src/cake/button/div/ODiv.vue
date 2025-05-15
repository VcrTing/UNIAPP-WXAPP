<template>
    <view
        class="btn bd fx-c"
        :class="weak ? clazz : (clazz + ' py-s br-x3 px')"
        >
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
defineProps<{ 
    clazz?: string,
    weak?: boolean
}>()
</script>
