<template>
    <image
        class="w-100 mh-3vh"
        :class="clazz"
        mode="aspectFill"
        :src="src ? src : (v || { }).src"
    />
</template>

<script setup lang="ts">
const prp = defineProps<{
    v?: ONE,
    src?: string,
    clazz?: string
}>()
</script>