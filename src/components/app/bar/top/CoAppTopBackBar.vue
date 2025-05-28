<template>
    <OAppTopBar :clazz="clazz" :mat="mat">
        <view class="w-100 fx-s">
            <view class="fx-i w-25" @tap="emt('back')">
                <view>
                    <OFI :clazz="'px-n py-n'" :class="clazz_i" :i="'i'"/>
                </view>
                <slot></slot>
            </view>
            <view class="fx-1">
                <slot name="tit"></slot>
            </view>
            <view class="w-25"></view>
        </view>
    </OAppTopBar>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';
import OFI from '@/cake/button/i/OFI.vue';

defineProps<{
    mat?: boolean,
    clazz?: string,
    clazz_i?: string
}>()

const emt = defineEmits([ 'back' ])
</script>