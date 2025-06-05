<template>
    <view :class="clazz" class="bd-x2 bd-s-d fx-c bc-pag-pri">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    clazz?: string
}>()

</script>