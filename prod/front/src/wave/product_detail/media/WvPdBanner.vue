<template>
    <swiper class="swiper" circular 
        v-if="banners && banners.length > 0"
        :indicator-dots="aii.indicatorDots" 
        :autoplay="aii.autoplay" 
        :interval="aii.interval"
        :duration="aii.duration"

        :style="{
            height: (toph + 'px')
        }"
        >
        <swiper-item v-for="(j, k) in banners" :key="k">
            <image class="swiper-item w-100 h-100" mode="aspectFill" :src="j.url"/>
        </swiper-item>
    </swiper>
    <view v-else class="w-100 h-100 btn-def">
        <view class="h-8em fx-c fx-b">
            <text class="tis">未找到任何图片</text>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    banners: Media[]
    toph: number
}>()

const aii = {
    indicatorDots: true,
    autoplay: true,
    interval: 3400,
    duration: 800
}
</script>