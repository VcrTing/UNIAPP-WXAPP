<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<IndexLayout>
			<template #top>
				<CoAppTopBar :clazz="''">
					<view class="ps-r zi-t">
						<OFI @tap="uniRouter.gopg('index_search')" :i="'search'" :clazz="'d-ib px-row py-row c-fff fx-aii-btn-wht ani-scaie-aii'"/>
					</view>
				</CoAppTopBar>
			</template>
			<template #bg>
				<VwIndexTop/>
			</template>
			<VwIndexPan/>
		</IndexLayout>
	</PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import IndexLayout from '@/components/layout/customization/IndexLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwIndexPan from '@/view/index/VwIndexPan.vue';
import VwIndexTop from '@/view/index/VwIndexTop.vue';
//
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>
