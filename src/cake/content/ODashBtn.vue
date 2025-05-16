<template>
    <view>
        <view :class="clazz" class="bd-x2 bd-s-d fx-c bc-pag-pri br-s">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    clazz?: string
}>()

</script>