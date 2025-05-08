<template>

    <!--
    <view :class="clazz" class="o-scroll scroll-hide o-h ox-s ps-r zi-s">
        <slot></slot>
    </view>
    -->
    <scroll-view scroll-x="true" show-scrollbar="false">
        <slot></slot>
    </scroll-view>
</template>

<script setup lang="ts">
defineProps<{
    clazz?: string
}>()
</script>