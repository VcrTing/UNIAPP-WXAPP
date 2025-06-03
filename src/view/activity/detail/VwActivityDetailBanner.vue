<template>
    <swiper class="swiper" circular 
        :indicator-dots="aii.indicatorDots" 
        :autoplay="aii.autoplay" 
        :interval="aii.interval"
        :duration="aii.duration"

        :style="{
            height: h || '34vh'
        }"
        >
        <swiper-item v-for="(j, k) in banners" :key="k">
            <image class="swiper-item w-100 h-100" mode="aspectFill" :src="j.url"/>
        </swiper-item>
    </swiper>
</template>

<script setup lang="ts">
import activity_tool from '@/tool/modules/activity_tool';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity,
    h: string // vh
}>()

const aii = {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500
}

const banners = computed((): ActivityMedia[] => {
    return activity_tool.getbanner(must_one<Activity>(prp.one))
})
</script>