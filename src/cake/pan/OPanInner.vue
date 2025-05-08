<template>
    <o-scroll-y class="pan-con">
        <slot></slot>
        <view v-if="close" class="mh-btn"></view>
    </o-scroll-y>

    <view v-if="close" class="abs-b i-0 w-100 pan-close soft">
        <o-button-i :deiay="100" :clazz="'w-100'" :i="'x'" @touch="pan_tooi.close_pan(idx)">
            关闭
        </o-button-i>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
defineProps<{ idx: number, close?: boolean }>()
</script>