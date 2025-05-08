<template>
    <image class="ui-img ui-img-png"
        mode="aspectFit" :src="src"
        @error="imageError" />
</template>

<script setup lang="ts">
const prp = defineProps<{ src: string }>()

const imageError = () => {
    console.log("图片加载错误")
}
</script>