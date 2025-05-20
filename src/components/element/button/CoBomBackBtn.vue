<template>
    <view class="abs-i b-0 px-row pb-x3" @tap="uniRouter.back">
        <OFI clazz="bg-con w-2em h-2em h5" :i="'i'"/>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import uniRouter from '@/tool/uni/uni-router';
// const prp = defineProps<{}>()

</script>