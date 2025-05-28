<template>
    <view class="abs-i b-0 ps-f-imp px-row pb-x3 zi-x2" @tap="uniRouter.back">
        <OButtonWht :weak="true" :clazz="'br-cir ' + clazz">
            <OFI clazz="w-2em h-2em h6" :i="'i'"/>
        </OButtonWht>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import uniRouter from '@/tool/uni/uni-router';
const prp = defineProps<{
    clazz?: string
}>()

</script>