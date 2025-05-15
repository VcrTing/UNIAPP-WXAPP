<template>
    <image class="mxw-12em uni-img br-cir" :class="clazz"
        mode="aspectFit" 
        :src="src"/>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()
defineProps<{
    src?: string
    clazz?: string,
}>()

</script>