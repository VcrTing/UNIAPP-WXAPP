<template>
    <view class="fx-s">
        <view class="mw-3em fx-i" @tap="emt('tapi')">
            <o-f-i-s :i="i ? i : 'i'" :clazz_i="'fx-c px-s'"/>
        </view>
        <view class="h6 ta-c fx-1">
            <slot></slot>
        </view>
        <view class="mw-3em fx-r" @tap="emt('tapr')"></view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    i?: string
}>()
const emt = defineEmits([ 'tapi', 'tapr' ])
</script>