<template>
    <view>
        <view class="o-app-top-bar" :class="clazz">
            <view class="mh-app-top-bar">
                <OSafeAreaTop/>
                <slot></slot>
            </view>
        </view>
        
        <OSafeAreaTop v-if="mat"/>
        <view class="mh-app-top-bar" v-if="mat"></view>
    </view>
    
</template>

<script setup lang="ts">
import OSafeAreaTop from '../safearea/OSafeAreaTop.vue';

defineProps<{
    mat?: boolean,
    clazz?: string
}>()
</script>