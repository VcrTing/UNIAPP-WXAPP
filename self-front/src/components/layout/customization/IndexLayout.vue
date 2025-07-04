<template>
    <view class="h-100 w-100">
        <slot name="top"></slot>
		<view class="">
            <view class="abs-t w-100 zi-t ps-f-imp">
                <slot name="bg"></slot>
            </view>
			<OSafeAreaTop/>
			<view class="mh-app-top-bar"></view>
            <view class="softer">
                <view :style="{
                    height: h
                }"></view>
                <slot></slot>
            </view>
        </view>
        
		<CoAppBottomBar/>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import { for_user_joing } from '@/conf/__for_index/for_user_loging';
import { timeout } from '@/tool/util/future';
import { nextTick } from 'vue';

defineProps<{ clazz?: string, h?: string }>()

const funn = {
	init: () => timeout(() => { for_user_joing() }, 600)
}
nextTick(funn.init)
</script>