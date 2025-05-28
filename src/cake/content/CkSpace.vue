<template>
        <view :style="{
            'height': h + 'em'
        }"></view>
</template>

<script setup lang="ts">
defineProps<{
    h?: number
}>()

</script>