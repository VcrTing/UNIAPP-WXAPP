<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<CoAppTopBar>
			<view class="">
				<OFI @tap="funn.search" :i="'search'" :clazz="'d-ib px-row pt'"/>
				<!--
				<CoIndexLogoTxt/>
				-->
			</view>
		</CoAppTopBar>
		<view>
			<VwIndexPan/>
		</view>
		<!---->
		<CoAppBottomBar/>
	</PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoIndexLogoTxt from '@/components/genra/logo/CoIndexLogoTxt.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { appCommit, appState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';
import VwIndexPan from '@/view/index/VwIndexPan.vue';

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
@use '../../ui/sass/theme/primary' as *
page, uni-page-body
	// background: $pri-pag-bg
</style>