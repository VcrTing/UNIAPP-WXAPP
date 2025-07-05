<template>
    <material-button 
        class="btn br bd btn-pri tils"
        :class="clazz"
        
        :clazz_outter="'w-100'"
        :clazz_inner="'py-s px-btn w-100 mh-btn fx-c ' + clazz_text"

        @touch="emt('touch')"
        >
        <slot></slot>
    </material-button>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string, clazz_text?: string }>()
const emt = defineEmits([ 'touch' ])
</script>