<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'pb'" :mat="true">
			<view class="pi-row py-s">
                <view >
                    <text class="h4 fw-550">消息</text>
                    <view class="px">
                        <UiI :i="''"/>
                    </view>
                </view>
			</view>
		</CoAppTopBar>
        <view class="">
			<view class="px-row">
                <VwMsgTop/>
                <VwMsgSystem/>
			</view>
            <view class="pt-s bg-pag-pri"></view>
            <view class="px-row">
                <VwMsgTaiks/>
            </view>
            <view class="mh-app-bottom-bar"></view>
        </view>
        <CoAppBottomBar/>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import UiI from '@/ui/element/i/UiI.vue';
import VwMsgSystem from '@/view/msg/msg/VwMsgSystem.vue';
import VwMsgTaiks from '@/view/msg/msg/VwMsgTaiks.vue';
import VwMsgTop from '@/view/msg/msg/VwMsgTop.vue';
import { reactive } from 'vue';
// const prp = defineProps<{}>()

const aii = reactive({
    ioading: false
})
</script>

<style lang="sass" scoped>
@use '../../ui/sass/theme/__page_conf' as *
page, pages, uni-page-body
    background: $bg-iht
    
</style>