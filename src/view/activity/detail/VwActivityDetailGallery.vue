<template>
    <view v-if="gallery && gallery.length > 0">
        
        <view class="pt-s bg-hui"></view>

        <view class="pb-col pt-x2 px-row">
            <text class="sus">详情图片</text>
        </view>
        <view>
            <view v-for="(v, i) in gallery" :key="i">
                <image class="w-100 h-25vh" mode="aspectFill" :src="v.src"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    one: ONE
}>()

const gallery = computed(() => {
    const res = must_one<ONE>(prp.one)['gallery'] || [ ]
    return res
})
</script>