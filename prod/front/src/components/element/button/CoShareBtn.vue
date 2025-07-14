<template>
    <view class="abs-r btn-app-share ps-f-imp px-row zi-x2">
        <OButton color="wht" :weak="true" :clazz="'br-cir ' + clazz">
            <OFI :clazz="isphone ? 'w-2em h-2em h6' : 'w-3em h-3em h5'" i='share'/>
        </OButton>
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import { uiGetters } from '@/memory/global';
import { computed } from 'vue';
defineProps<{
    clazz?: string,
}>()

const isphone = computed((): boolean => uiGetters.isphone)
</script>