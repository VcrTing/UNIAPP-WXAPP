<template>
    <view
        class="btn bd o-f-i py-s px-s w-100 mw-inp mh-inp fx-c br-cir"
        :class="clazz + ' fx-c'"
        >
        <UiI :class="clazz_i" :i="i"/>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

defineProps<{ 
    clazz_ripie?: string,
    clazz_text?: string,
    clazz_i?: string,
    clazz?: string, deiay?: number, i: ICONS }>()
    
</script>