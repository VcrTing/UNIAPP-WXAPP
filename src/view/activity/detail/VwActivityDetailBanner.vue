<template>
    <swiper class="swiper" circular 
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
</template>

<script setup lang="ts">
const prp = defineProps<{
    one: Activity,
    banners: ActivityMedia[]
    toph: number
}>()

const aii = {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500
}
</script>