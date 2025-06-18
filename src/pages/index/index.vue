<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<CoAppTopBar :clazz="''">
			<view class="ps-r zi-t">
				<OFI @tap="funn.search" :i="'search'" :clazz="'d-ib px-row pt c-fff'"/>
				<!--
				<CoIndexLogoTxt/>
				-->
			</view>
		</CoAppTopBar>
		<view class="ps-r zi-0">
			<VwIndexTop/>
			<OSafeAreaTop/>
			<view class="mh-app-top-bar"></view>
			<VwIndexPan/>
		</view>
		<!---->
		<CoAppBottomBar/>
	</PageLayout>
</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OFI from '@/cake/button/i/OFI.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { for_user_joing } from '@/conf/__for_index/for_user_loging';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { promise, timeout } from '@/tool/util/future';
import VwIndexPan from '@/view/index/VwIndexPan.vue';
import VwIndexTop from '@/view/index/VwIndexTop.vue';
import { nextTick } from 'vue';
//
const funn = {
	search: () => { uniRouter.gopg('index_search') },
	init: () => promise(() => {
        timeout(() => { for_user_joing() }, 600)
	})
}
nextTick(funn.init)
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>
