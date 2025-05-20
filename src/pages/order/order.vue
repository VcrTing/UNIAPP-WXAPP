<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'bg-pag-pri pb'" :mat="true">
			<view class="pi-row pt">
                <view class="h4 bb">订单中心</view>
			</view>
		</CoAppTopBar>
        <view class="pt-row">
            <VwOrderNow :order="aii.doing"/>
            <view class="pt"></view>
            <VwOrderHistory :items="aii.items"/>
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
import VwOrderHistory from '@/view/order/order/VwOrderHistory.vue';
import VwOrderNow from '@/view/order/order/VwOrderNow.vue';
import { reactive } from 'vue';
// const prp = defineProps<{}>()

const aii = reactive({
    doing: mock_orders.items[0],
    items: mock_orders.items
})
</script>

<style lang="sass" scoped>
@use '../../ui/sass/theme/primary' as *
page, uni-page-body
	background: $pri-pag-bg
</style>