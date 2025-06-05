<template>
    <view>
        <view class="o-app-top-bar" :class="clazz">
            <view class="mh-app-top-bar">
                <OSafeAreaTop/>
                <slot></slot>
            </view>
        </view>
        
        <OSafeAreaTop v-if="mat"/>
        <view class="py-n" v-if="mat">&nbsp;</view>
    </view>
    
</template>

<script setup lang="ts">
import OSafeAreaTop from '../safearea/OSafeAreaTop.vue';

defineProps<{
    mat?: boolean,
    clazz?: string
}>()
</script>