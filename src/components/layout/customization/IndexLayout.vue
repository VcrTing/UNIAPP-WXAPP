<template>
    <view class="h-100 w-100">
        <slot name="top"></slot>
		<view class="">
            <view class="abs-t w-100 zi-t">
                <view class="w-100" :style="{
                    'margin-top': '-3.3rem',
                    'height': 'calc(14.5rem)'
                }">
                    <slot name="bg"></slot>
                </view>
            </view>
			<OSafeAreaTop/>
			<view class="mh-app-top-bar"></view>
            <slot></slot>
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

defineProps<{ clazz?: string }>()

const funn = {
	init: () => timeout(() => { for_user_joing() }, 600)
}
nextTick(funn.init)
</script>