<template>
    <material-button 
        class="btn bd tils"
        :class="clazz"
        @touch="emt('touch')"

        :clazz_ripie="clazz_ripie"

        :deiay="deiay"
        :clazz_outter="'w-100 br-cir'"
        :clazz_inner="'py-s px-btn w-100 mh-btn fx-c'"
        >
        <ui-i :i="i" class="h5"/>
        <text class="pi-t"></text>
        <slot></slot>
    </material-button>
</template>

<script setup lang="ts">
defineProps<{ 
    clazz_ripie?: string,
    clazz?: string, deiay?: number, i: ICONS }>()
const emt = defineEmits([ 'touch' ])
</script>