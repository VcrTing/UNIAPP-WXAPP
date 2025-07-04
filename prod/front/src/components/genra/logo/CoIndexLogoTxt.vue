<template>
    <view class="fx-i">
        <image class="mxw-12em uni-img w-2em h-2em br-s" :class="clazz"
            mode="aspectFit" 
            src="../../../static/logo.png"/>
        <view class="pi-s">
            <text class="h7">{{ info.desc }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { appState } from '@/memory/global';
import { computed } from 'vue';

// const prp = defineProps<{}>()
defineProps<{
    clazz?: string,
}>()

const info = computed((): AppInfo => appState.info) 
</script>