<template>
    <view class="px-s pb">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{ one: ONE, config: ONE}>()

</script>