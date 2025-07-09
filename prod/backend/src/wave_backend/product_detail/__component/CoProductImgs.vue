<template>
    <view>
        <view v-for="(v, i) in medias" :key="i"
            :class="w_clazz" class="d-ib ps-r zi-t"
            :style="{
                    'height': media_tool.img_h_view(w_item, v.w, v.h)
                }"
            >
            <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>

            <view class="abs-t i-0 zi-n" v-if="media_tool.is_sex(v)">
                <OButtonTag color="err" clazz="px br-1 fx-c">
                    <text class="fs-t">色情内容！！！</text>
                </OButtonTag>
            </view>
            <view class="abs-b r-0 py-s px-row zi-n">
                <OButtonTag @tap="emt('sex', v)" color="wht-s" clazz="px br-1 fx-c">
                    <text class="fs-t">标注色情</text>
                </OButtonTag>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import { uiGetters, uiState } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { computed } from 'vue';

defineProps<{
    medias: Media[]
}>()
const emt = defineEmits([ 'sex' ])


const w_screen = computed(() => uiState.w)
const isphone = computed(() => uiGetters.isphone)
const w_item = computed(() => {
    if (isphone.value) { return w_screen.value / 2 }
    return w_screen.value / 5
})
const w_clazz = computed(() => {
    if (isphone.value) return 'w-50'
    return 'w-20'
})
</script>