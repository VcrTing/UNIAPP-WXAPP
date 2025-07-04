<template>
    <view
        class="btn bd tils py-s w-100 fx-c br-cir"
        :class="clazz"
        :deiay="deiay"
        >
            <UiI :i="i"/>
            <text class="pi-t"></text>
            <slot></slot>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

defineProps<{ 
    clazz?: string, 
    deiay?: number, 
    i: ICONS }>()

</script>