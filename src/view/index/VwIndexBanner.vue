<template>
    
    <view class="w-100 ts" :style="{
        'margin-top': '-3.3rem',
        'height': 'calc(14.5rem + ' + h + ')'
    }">
        <swiper class="swiper w-100 h-100" circular 
            v-if="banners && banners.length > 0"
            :indicator-dots="aii.indicatorDots" 
            :autoplay="aii.autoplay" 
            :interval="aii.interval"
            :duration="aii.duration"

        >
            <swiper-item v-for="(j, k) in banners" :key="k">
                <image class="swiper-item w-100 h-100" mode="aspectFill" :src="j.url"/>
            </swiper-item>
        </swiper>
        <view v-else class="w-100 h-100">
            <image class="w-100 h-100" mode="aspectFill" :src="banner"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import { appState } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const aii = {
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 900
}
defineProps<{ h: string }>()

const src = 'https://pic.rmb.bdstatic.com/15302801526a3e5f91b9aa002095a4363289433612.jpeg'

const banner = '/static/bg/index_top.jpg'

const info = computed((): AppInfo => appState.info) 

const banners = computed((): Media[] => media_tool.fer_sex(must_arr(info.value.index_banners)))
</script>