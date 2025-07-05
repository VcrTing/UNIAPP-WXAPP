<template>
    <material-button 
        class="btn br bd btn-pri-out tils"

        :clazz_ripie="'bg-pri-shd'"

        :class="clazz"
        :clazz_outter="'w-100'"
        :clazz_inner="'py-s px-btn w-100 mh-btn fx-c'"
        @touch="emt('touch')"
        >
        <slot></slot>
    </material-button>
</template>

<script setup lang="ts">
defineProps<{ clazz?: string }>()
const emt = defineEmits([ 'touch' ])
</script>