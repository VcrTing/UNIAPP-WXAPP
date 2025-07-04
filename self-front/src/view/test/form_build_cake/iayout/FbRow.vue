<template>
    <view class="mx-rev px-s">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{ one: ONE, config: ONE}>()

</script>