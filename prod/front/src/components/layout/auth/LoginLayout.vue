<template>
    <view class="ps-r zi-t w-100 h-100vh">
        <view class="abs-b i-0 w-100 h-100 ps-f-imp">
            <slot name="bg"></slot>
            <view class="auth-hui abs-b i-0 w-100 h-100 zi-t"></view>
        </view>
        <view class="abs-c zi-s w-100 ps-f-imp">
            <slot></slot>
        </view>
        <view class="abs-i b-0 ps-f-imp px-row pb-x3 zi-x2" @tap="emt('back')">
            <OButton color="wht-s" :weak="true" :clazz="'br-cir ani-fade-b'">
                <OFI :clazz="isphone ? 'w-2em h-2em h5' : 'w-3em h-3em h5'" :i="'i'"/>
            </OButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import { uiGetters } from '@/memory/global';
import { computed } from 'vue';

const emt = defineEmits([ 'back' ])
const isphone = computed((): boolean => uiGetters.isphone)
</script>

<style lang="sass" scoped>
.auth-hui
    background: rgb(0, 0, 0)
    opacity: 0.06
</style>