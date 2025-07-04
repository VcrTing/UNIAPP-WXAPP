<template>
    <material-button 
        class="btn br bd btn-pri-iht tils"
        @touch="emt('touch')"

        :clazz_ripie="'bg-pri-iht-fcs'"

        :class="clazz"
        :clazz_outter="'w-100'"
        :clazz_inner="'py-s px-btn w-100 mh-btn fx-c'"
        >
        <slot></slot>
    </material-button>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string }>()
const emt = defineEmits([ 'touch' ])
</script>