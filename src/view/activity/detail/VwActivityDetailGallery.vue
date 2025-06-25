<template>
    <view v-if="gallery && gallery.length > 0">
        <view class="pt-s bg-hui"></view>
        <CoMoAdHeader>详情图片</CoMoAdHeader>
        
        <view class="pt-x1 bg-con">
            <view v-for="(v, i) in gallery" :key="i"
                :style="{
                        'height': media_tool.img_h_view(w_screen, v.w, v.h)
                    }">
                <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
            </view>
        </view>
    </view>
    <view v-else class="bg-con">
        <CkSpace :h="4"/>
    </view>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import { uiState } from '@/memory/global';
import activity_tool from '@/tool/modules/activity_tool';
import media_tool from '@/tool/modules/common/media_tool';
import { computed } from 'vue';
import CoMoAdHeader from './component/CoMoAdHeader.vue';

const prp = defineProps<{
    one: Activity
}>()

const gallery = computed(() => {
    return activity_tool.getgallery(prp.one)
})

const w_screen = computed(() => {
    return uiState.w || 375
})
</script>