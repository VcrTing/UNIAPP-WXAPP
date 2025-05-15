<template>
    <OAppTopBar :clazz="clazz" :mat="mat">
        <slot></slot>
    </OAppTopBar>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';

defineProps<{
    mat?: boolean,
    clazz?: string
}>()

</script>