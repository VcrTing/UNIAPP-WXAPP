<template>
    <view
        class="btn bd o-f-i fx-c br-cir"
        :class="clazz"
        >
        <UiI class="w-1em h-1em fx-c" :class="clazz_i" :i="i"/>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

defineProps<{ 
    clazz_i?: string,
    clazz?: string, deiay?: number, i: ICONS,
    weak?: boolean
}>()
    
</script>