<template>
    <material-button 
        class="btn bd o-f-i"
        :class="clazz + ' fx-c'"
        @touch="emt('touch')"

        :clazz_ripie="clazz_ripie"

        :deiay="deiay"
        :clazz_outter="'w-100'"
        :clazz_inner="'py-s px-s w-100 mw-inp mh-inp fx-c h6 ' + clazz_text"
        >
        <ui-i :class="clazz_i" :i="i"/>
    </material-button>
</template>

<script setup lang="ts">
defineProps<{ 
    clazz_ripie?: string,
    clazz_text?: string,
    clazz_i?: string,
    clazz?: string, deiay?: number, i: ICONS }>()
const emt = defineEmits([ 'touch' ])
</script>