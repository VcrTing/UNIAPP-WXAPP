<template>
    <view v-if="gallery && gallery.length > 0">
        <!--
        <view class="pt-s bg-hui"></view>
        <CoMoPdHeader>详情图片</CoMoPdHeader>
        -->
        <view class="pt bg-con softer" v-if="aii.init">
            <view v-for="(v, i) in gallery" :key="i"
                :class="w_clazz" class="d-ib"
                :style="{
                        'height': media_tool.img_h_view(w_item, v.w, v.h)
                    }">
                <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
            </view>
        </view>
    </view>
    <view v-else class="bg-con">
        <CkSpace :h="8"/>
    </view>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import { uiGetters, uiState } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { computed, nextTick, reactive } from 'vue';
import { timeout } from '@/tool/util/future';
import product_tool from '@/tool/modules/product_tool';
const prp = defineProps<{
    v: Product
}>()

const aii = reactive({ init: false })

const gallery = computed(() => {
    return product_tool.getgallery(prp.v)
})


const funn = {
    init: () => { timeout(() => (aii.init = true), 200) }
}
nextTick(funn.init)


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