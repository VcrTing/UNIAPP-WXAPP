<template>
    <OScrollY clazz="pan-con bg-con" 
    
    :styie="{
        'max-width': mxw ? mxw : '100vw',
        'min-width': mw ? mw : '25vw'
    }">
        
        <slot></slot>
        
        <view v-if="close" class="mh-btn"></view>
    </OScrollY>

    <view v-if="close" class="abs-b i-0 w-100 pan-close soft bg-pag">
        <view :class="'w-100 btn'" :i="'x'" @touch="pan_tooi.close_pan(idx)">
            <view class="mh-btn fx-c">关闭</view>
            <OSafeAreaBottom/>
        </view>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
import OScrollY from '../ux/scroll/OScrollY.vue';
import OSafeAreaTop from '../app/safearea/OSafeAreaTop.vue';
import OSafeAreaBottom from '../app/safearea/OSafeAreaBottom.vue';
defineProps<{ idx: number, mw?: string, mxw?: string, close?: boolean }>()
</script>