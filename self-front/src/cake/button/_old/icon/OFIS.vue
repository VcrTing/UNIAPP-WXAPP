<template>
    <material-button 
        class="o-f-i o-f-i-s ts"
        :class="clazz + ' fx-c'"
        @touch="emt('touch')"

        :clazz_ripie="clazz_ripie"

        :deiay="deiay"
        :clazz_inner="'fx-c h6 ' + clazz_text"
        >
        <ui-i class="o-f-i-icon" :clazz="clazz_i" :i="i"/>
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