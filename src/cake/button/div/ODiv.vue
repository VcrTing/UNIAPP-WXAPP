<template>
    <view
        class=""
        :class="clazz"
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
