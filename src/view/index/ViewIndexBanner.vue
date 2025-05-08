<template>
    <o-content-rs :tit="'时尚设计'">
        <o-scroll-x :clazz="'br'">
            <view class="pag-index-banner fx-i">
                <view class="d-ib pr-s" v-for="(v, i) in me.banners" :key="i">
                    <view class="banner-item ani-scaie-aii">
                        <o-div :clazz="'br'" :clazz_hui="'zi-x3-imp'">
                            <image class="w-100 banner-item-img br" mode="aspectFill" :src="v.img"/>
                        </o-div>
                    </view>
                </view>
            </view>
        </o-scroll-x>
    </o-content-rs>
        <!--
        <view class="pag-index-banner br-x1 o-h">
			<swiper class="swiper" circular :indicator-dots="me.indicatorDots" :autoplay="me.autoplay" :interval="me.interval"
				:duration="me.duration">
				<swiper-item>
					<view class="swiper-item">
                        <image class="w-100 swiper-item-img br-x1" mode="aspectFill" src="../../static/banner/index/1.jpg"/>
                    </view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
                        <image class="w-100 swiper-item-img br-x1" mode="aspectFill" src="../../static/banner/index/2.jpg"/>
                    </view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
                        <image class="w-100 swiper-item-img br-x1" mode="aspectFill" src="../../static/banner/index/3.png"/>
                    </view>
				</swiper-item>
			</swiper>
		</view>
        -->
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()

const me = reactive({
    background: ['color1', 'color2', 'color3'],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

    banners: [
        { img: '../../static/banner/index/1.jpg' },
        { img: '../../static/banner/index/2.jpg' },
        { img: '../../static/banner/index/3.png' },
    ]
})
</script>