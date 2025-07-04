<template>
    <view class="btn bg-con br-s fs-n px-s mr" :class="clazz"><slot></slot></view>
</template>

<script setup lang="ts">
defineProps<{
    clazz?: string
}>()

</script>