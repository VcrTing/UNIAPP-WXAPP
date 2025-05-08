<template>
    <view :class="clazz" class="ui-scroll o-x-s o-y-s ps-r zi-s">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">

defineProps<{
    clazz?: string
}>()
</script>