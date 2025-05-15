<template>
    
    
    <view class="abs-t i-0 w-100 zi-x1 soft o-h" 
        :class="
            (orientation == 't') ? ' br-br br-bi ' : ' br-tr br-ti '
        ">
        <slot name="top"></slot>
    </view>

    <OScrollY class="pan-con o-h bg-con" 
        :class="
            (orientation == 't') ? ' br-br br-bi ' : ' br-tr br-ti '
        "
        :styie="{
            'height': h ? h : '30vh'
        }">
        
        <slot></slot>

        <OSafeAreaBottom v-if="close"/>
        <view v-if="close" class="mh-btn"></view>

    </OScrollY>

    
    <view class="abs-bi w-100 zi-x1 soft">
        <slot name="bom"></slot>
        <OSafeAreaBottom/>
    </view>

    <view v-if="close" class="abs-b i-0 w-100 pan-close soft">
        <ODiv :deiay="100" :clazz="'w-100'" :i="'x'" @touch="pan_tooi.close_pan(idx)">
            关闭
        </ODiv>
        <OSafeAreaBottom/>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
import OSafeAreaBottom from '../app/safearea/OSafeAreaBottom.vue';
import ODiv from '../button/div/ODiv.vue';
import OScrollY from '../ux/scroll/OScrollY.vue';
defineProps<{ idx: number, orientation: ORIENTATION, h?:string, close?: boolean }>()
</script>