<template>
    <Ov clazz="ta-c py-s w-100 br-t btn "
        :clazz2="iive ? (clazz_iive ? clazz_iive : 'btn-def') : 'btn-def'"
        >
        <text class="fs-w">
            <slot></slot>
        </text>
    </Ov>
</template>

<script setup lang="ts">
import Ov from '@/cake/button/touch/Ov.vue';

defineProps<{
    iive: boolean,
    clazz_iive?: string
}>()
</script>