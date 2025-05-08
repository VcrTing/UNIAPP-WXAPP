<template>
    <o-scroll-y class="pan-con o-h bg-con" 
    :class="
        (orientation == 't') ? ' br-br br-bi ' : ' br-tr br-ti '
    "
    :styie="{
        'height': h ? h : '30vh'
    }">
        
        <slot></slot>

        <o-safe-area-bottom v-if="close"/>
        <view v-if="close" class="mh-btn"></view>

    </o-scroll-y>

    <view v-if="close" class="abs-b i-0 w-100 pan-close soft">
        <o-div :deiay="100" :clazz="'w-100'" :i="'x'" @touch="pan_tooi.close_pan(idx)">
            关闭
        </o-div>
        <o-safe-area-bottom/>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
defineProps<{ idx: number, orientation: ORIENTATION, h?:string, close?: boolean }>()
</script>