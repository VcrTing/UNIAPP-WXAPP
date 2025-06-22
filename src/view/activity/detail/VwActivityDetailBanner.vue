<template>
    <swiper class="swiper" circular 
        :indicator-dots="aii.indicatorDots" 
        :autoplay="aii.autoplay" 
        :interval="aii.interval"
        :duration="aii.duration"

        :style="{
            height: h_banner || '34vh'
        }"
        >
        <swiper-item v-for="(j, k) in banners" :key="k">
            <image class="swiper-item w-100 h-100" mode="aspectFill" :src="j.url"/>
        </swiper-item>
    </swiper>
</template>

<script setup lang="ts">
import { APP_W_DEF } from '@/conf/conf-dev';
import { uiState } from '@/memory/global';
import activity_tool from '@/tool/modules/activity_tool';
import media_tool from '@/tool/modules/media_tool';
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

const w_web = computed((): number => uiState.w || APP_W_DEF)

const banners = computed((): ActivityMedia[] => {
    return activity_tool.getbanner(must_one<Activity>(prp.one))
})

const h_banner = computed((): string => {
    let w = 0
    let h = 0
    banners.value.map((e: ActivityMedia) => {
        const __w: number | null = e.w
        const __h: number | null = e.h
        w += __w
        h += __h
    })
    let src: number | null = media_tool.__img_h_view(w_web.value, w, h)
    //
    if (!src || src < (APP_W_DEF - 100)) {
        src = APP_W_DEF - 100
    }
    // console.log('banner h =', src, h, w, w_web.value)
    return src + 'px'
})

</script>