<template>
        
		<view class="layout-detail h-100 mxh-100 ps-r zi-m mxw-pc">
			<view class="zi-m">
                <slot name="bg"></slot>
			</view>
			<!--
			<view class="layout-detail-sec ps-a t-0 i-0 w-100 zi-s">
				<view class="layout-detail-sec-inner mxw-pc"
					:style="{
						height: __toph
					}"
				>
					<OSafeAreaTop/>
                    <slot name="top"></slot>
				</view>
			</view> 
			-->
			<view class="layout-detail-con w-100 zi-n"
			>
				<view class="layout-detail-con-inner h-100 ps-r zi-n"
					:class="clazz_con ? clazz_con : 'bg-con'"
				>
                    <slot name="con"></slot>
				</view>
			</view>

			<view class="ps-f b-0 i-0 w-100 zi-x1">
				<view class="mxw-pc">
					<slot name="bom"></slot>
				</view>
			</view>
		</view>

</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import { DEV_MEDIA_VIEW } from '@/conf/conf-dev';
import { uiState } from '@/memory/global';
import { computed } from 'vue';

const prp = defineProps<{
	h?: number,
	toph?: number,
	clazz_con?: string
}>()

const __def = 300;
const __unit = 'px'

const __toph = computed(() => {
	let res = __def
	if (prp.toph) {
		res = prp.toph
	}
	// 超出 APP H
	if (res > h_app.value) {
		return DEV_MEDIA_VIEW.BANNER_MORE_THAN_VH(res, h_app.value) + __unit
	}
	return res + __unit
})

const h_web = computed((): string => '100vh')
const h_app = computed((): number => uiState.h)

const __conh = computed((): string => {
	let res: number = __def
	if (prp.toph) {
		res = prp.toph
	}
	if (res > h_app.value) {
		return '100vh'
	}
	return `calc(${h_web.value} - ${res + __unit})`
})
</script>