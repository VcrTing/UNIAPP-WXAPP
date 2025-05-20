<template>
    <view
        class="btn bd btn-def tils ta-c"
        :class="weak ? clazz : (clazz + ' py-s br-rnd px')"
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
