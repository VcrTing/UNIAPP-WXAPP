<template>
    <view>
        <image class="ui-img" :class="clazz" :style="style"
            mode="aspectFill" :src="src"
            @error="imageError" />
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{ src: string, clazz: string | null, style: ONE | null }>()

const imageError = () => {
    console.log("图片加载错误")
}
</script>