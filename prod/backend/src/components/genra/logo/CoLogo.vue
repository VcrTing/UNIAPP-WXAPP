<template>
    <view class="w-100">
        <image class="mxw-12em uni-img" :class="clazz"
            mode="aspectFit" 
            src="../../../static/logo.png"/>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()
defineProps<{
    clazz?: string,
}>()

</script>