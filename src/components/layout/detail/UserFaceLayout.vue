<template>
		<view class="h-100 mxh-100 ps-r zi-m">
			<view class="h-50vh zi-m">
                <slot name="bg"></slot>
			</view>
			<view class="ps-a t-0 i-0 w-100 h-100 zi-s">
				<view class=""
					:style="{
						height: toph
					}"
				>
					<OSafeAreaTop/>
                    <slot name="top"></slot>
				</view>
			</view>
			<view class="ps-a b-0 i-0 w-100 zi"
				:style="{
					height: conh
				}"
			>
				<view class="h-100 bg-con">
                    <slot name="con"></slot>
				</view>
			</view>
		</view>

</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import { computed } from 'vue';

const prp = defineProps<{
	h?: number
}>()

const __def = 61.8;
const __unit = 'vh'

const toph = computed(() => {
	let res = __def
	if (prp.h) {
		let tp = 100 - prp.h
		res = tp < 0 ? 0 : tp
	}
	return res + __unit
})

const conh = computed(() => {
	let res = __def
	if (prp.h) {
		res = prp.h
	}
	return res + __unit
})
</script>