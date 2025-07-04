<template>
    <OAppBottomBar :clazz="clazz" :mat="mat">
        <slot></slot>
    </OAppBottomBar>
</template>

<script setup lang="ts">
import OAppBottomBar from '@/cake/app/bar/OAppBottomBar.vue';

// const prp = defineProps<{}>()

defineProps<{
    mat?: boolean,
    clazz?: string
}>()

</script>