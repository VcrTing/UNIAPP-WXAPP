<template>
    <view v-if="gallery && gallery.length > 0">
        
        <view class="pt-s bg-hui"></view>

        <view class="pb-col pt-x2 px-row">
            <view class="px-col"><text class="sus">详情图片</text></view>
        </view>
        <view class="pt-x1">
            <view v-for="(v, i) in gallery" :key="i">
                <image class="w-100 h-28vh" :src="v.url" mode="aspectFill"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import activity_tool from '@/tool/modules/activity_tool';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity
}>()

const gallery = computed(() => {
    return activity_tool.getgallery(prp.one)
})
</script>