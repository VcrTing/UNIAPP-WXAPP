<template>
    <view class="h-100 w-100 ps-f-imp">
        <!---->
        <slot name="top"></slot>
		<view class="">
            <view class="abs-t w-100 zi-t ps-f-imp">
                <slot name="bg"></slot>
            </view>
			<OSafeAreaTop/>
			<view class="mh-app-top-bar"></view>
        </view>
        
        <slot></slot>
		<CoAppBottomBar :clazz="bar_clazz"/>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import { timeout } from '@/tool/util/future';
import { nextTick } from 'vue';

defineProps<{ clazz?: string, h?: string, bar_clazz?: string }>()

const funn = {
	init: () => timeout(() => { 
        // for_user_joing() 
    }, 600)
}
nextTick(funn.init)
</script>