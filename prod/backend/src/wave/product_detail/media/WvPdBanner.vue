<template>
    <view>
        <view v-for="(v, i) in banners" :key="i"
            :class="w_clazz" class="d-ib"
            :style="{
                    'height': media_tool.img_h_view(w_item, v.w, v.h)
                }">
            <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import { uiGetters, uiState } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { computed } from 'vue';

const prp = defineProps<{
    banners: Media[]
    toph: number
}>()

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