<template>
    <view class="abs-r b-0 ps-f-imp px-row pb-x3 zi-x2">
        <OButton color="wht" :weak="true" :clazz="'br-cir ' + clazz" @tap="emt('do')">
            <OFI clazz="w-3em h-3em h6" :i="'+'"/>
        </OButton>
        <view class="mh-app-bottom-bar" v-if="bombar"></view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
const prp = defineProps<{
    clazz?: string,
    bombar?: boolean
}>()

const emt = defineEmits([ 'do' ])
</script>