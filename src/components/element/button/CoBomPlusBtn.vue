<template>
    <view class="abs-r b-0 ps-f-imp px-row pb-x3 zi-x2">
        <OButtonWht :weak="true" :clazz="'br-cir ' + clazz" @tap="emt('do')">
            <OFI clazz="w-3em h-3em h6" :i="'+'"/>
        </OButtonWht>
        <view class="mh-app-bottom-bar" v-if="bombar"></view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import uniRouter from '@/tool/uni/uni-router';
const prp = defineProps<{
    clazz?: string,
    bombar?: boolean
}>()

const emt = defineEmits([ 'do' ])
</script>