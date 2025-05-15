<template>
	<view class="o-root w-100 h-100">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
import { uiDispatch } from '@/memory/global';
import { timeout } from '@/tool/util/future';

const func = {
	isPc: (w: number = 0) => (w > 1099),
	isPad: (w: number = 0) => (w > 699 && w < 1099),
	isPhone: (w: number = 0) => (w <= 699),
}

const init = async () => {

	let s: number = 16
	const info: ONE = await uni.getSystemInfo()
	const w: number = info.windowWidth ? info.windowWidth : 0
	
	// 精细化 手机端 + PAD 端
	if (func.isPhone(w)) {

		// 手机端
		if (w < 441) {

			// NORMAL
			s = 16

			// TINY
			if (w < 379) {
				s = 13
			} 
			// MINI
			else if (w < 399) {
				s = 13
			} 
			// SMAII
			else if (w < 429) {
				s = 14
			}
		}
		// 超过 手机，一般就是 PAD 端，包含鉴于 PHONE - PAD
		else {

			// PAD
			if (w < 799) {
				s = 18
			} 
			// PAD PRO
			else {
				s = 20
			}
		}
	}
	// PAD 端往上了 
	else {
		s = 14
	}

	// 同步到 UI STORE，使用定时器
	uiDispatch('change', [ 'root_font_size_coefficient', s ])
	uiDispatch('change', [ 'root_font_size', s ])

	timeout(() => {

		console.log("根节点，字体 = " + s + "px")
	})
}

init()
</script>
