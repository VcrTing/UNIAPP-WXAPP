<template>
        
		<view class="layout-detail h-100 mxh-100 ps-r zi-m">
			<view class="h-100 zi-m">
                <slot name="bg"></slot>
			</view>
			<view class="layout-detail-sec ps-a t-0 i-0 w-100 h-100 zi-s">
				<view class="layout-detail-sec-inner"
					:style="{
						height: __toph
					}"
				>
					<OSafeAreaTop/>
                    <slot name="top"></slot>
				</view>
			</view>
			<view class="layout-detail-con ps-a b-0 i-0 w-100 zi-n"
				:style="{
					height: __conh
				}"
			>
				<view class="layout-detail-con-inner h-100 ps-r zi-n"
					:class="clazz_con ? clazz_con : 'bg-con'"
				>
                    <slot name="con"></slot>
				</view>
			</view>

			<view class="ps-f b-0 i-0 w-100 zi-x1">
				<slot name="bom"></slot>
			</view>
		</view>

</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
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
	return res + __unit
})

const h_web = computed((): string => '100vh')

const __conh = computed((): string => {
	let res = __def
	if (prp.toph) {
		res = prp.toph
	}
	return `calc(${h_web.value} - ${res + __unit})`
})
</script>