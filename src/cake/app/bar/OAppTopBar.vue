<template>
    <view>
        <view class="o-app-top-bar" :class="clazz">
            <view class="mh-app-top-bar">
                <OSafeAreaTop v-if="!not_in_safearea"/>
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
    clazz?: string,
    not_in_safearea?: boolean
}>()
</script>