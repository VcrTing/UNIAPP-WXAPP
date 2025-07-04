<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<IndexLayout :h="h_v">
			<template #top>
				<CoAppTopBar :clazz="''">
					<view class="ps-r zi-t">
						<OFI @tap="uniRouter.gopg('index_search')" :i="'search'" :clazz="'d-ib px-row py-row c-fff fx-aii-btn-wht-s ani-scaie-aii'"/>
					</view>
				</CoAppTopBar>
			</template>
			<template #bg>
				<WvIndexBanner :h="h_v"/>
			</template>
			<WvIndexPan :h="h_v"/>
		</IndexLayout>
	</PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import IndexLayout from '@/components/layout/customization/IndexLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { appGetters, uiGetters, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { computed } from 'vue';
import WvIndexBanner from '@/wave/index/WvIndexBanner.vue';
import WvIndexPan from '@/wave/index/WvIndexPan.vue';
//
const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)

const h = computed((): number => {
	if (ispc.value) return 52
	return isphone.value ? 0 : 120
})

const h_v = computed((): string => {
	let __h: number = h.value
	return __h + 'px'
})
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>
