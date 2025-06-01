<template>
    <view :style="{
        'background-color': 'transparent',
        'height': h + 'em'
    }"></view>
</template>

<script setup lang="ts">
defineProps<{
    h?: number
}>()

</script>