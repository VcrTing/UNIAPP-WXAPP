<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<IndexLayout :h="h_v">
			<template #bg>
				<WvIndexBanner :h="h_v"/>
			</template>
			<WvIndexPan :h="h_v"/>
		</IndexLayout>
	</PageLayout>
</template>

<script setup lang="ts">
import IndexLayout from '@/components/layout/customization/IndexLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiGetters, uiState } from '@/memory/global';
import { computed } from 'vue';
import WvIndexBanner from '@/wave_backend/index/WvIndexBanner.vue';
import WvIndexPan from '@/wave_backend/index/WvIndexPan.vue';
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
