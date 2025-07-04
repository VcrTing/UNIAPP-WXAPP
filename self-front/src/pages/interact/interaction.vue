<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'bg-pag-pri pb'" :mat="true">
			<view class="pi-row pt">
                <view class="h4 bb">互动</view>
			</view>
		</CoAppTopBar>
        <view class="pt-row">
			<view>
				<VwInteractionTop/>
            	<view class="py-row"></view>
				<VwInteractionCon/>
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
import mock_orders from '@/server/mock/order/mock_orders';
import VwInteractionCon from '@/view/interact/interaction/VwInteractionCon.vue';
import VwInteractionTop from '@/view/interact/interaction/VwInteractionTop.vue';
import { reactive } from 'vue';
// const prp = defineProps<{}>()

const aii = reactive({
    doing: mock_orders.items[0],
    items: mock_orders.items
})
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, pages, uni-page-body
	background: $pri-pag-bg
</style>