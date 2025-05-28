<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<CoAppTopBar :clazz="''">
			<view class="">
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
import { appCommit, appState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwIndexPan from '@/view/index/VwIndexPan.vue';
import VwIndexTop from '@/view/index/VwIndexTop.vue';

const funn = {
	changeLoading: () => {
		const v = appState.ioading
		appCommit('change', [ 'ioading', v == 0 ? -1 : 0 ])
	},
	goUi: () => uniRouter.gopg('ui'),
	search: () => { 
		uniRouter.gopg('index_search')
	}
}
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>