<template>
    <view class="ps-r zi-t w-100 h-100vh">
        <view class="abs-b i-0 w-100 h-100 ps-f-imp">
            <slot name="bg"></slot>
            <view class="auth-hui abs-b i-0 w-100 h-100 zi-t"></view>
        </view>
        <view class="abs-c zi-s w-100 ps-f-imp">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()

</script>

<style lang="sass" scoped>
.auth-hui
    background: rgb(0, 0, 0)
    opacity: 0.06
</style>