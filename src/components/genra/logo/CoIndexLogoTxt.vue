<template>
    <view class="fx-i">
        <image class="mxw-12em uni-img w-2em h-2em br-s" :class="clazz"
            mode="aspectFit" 
            src="../../../static/logo.png"/>
        <view class="pi-s">
            <text class="h7">{{ APP_GENERATE_DETAIL.desc }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';

// const prp = defineProps<{}>()
defineProps<{
    clazz?: string,
}>()
</script>