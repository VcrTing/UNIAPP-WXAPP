<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <OAppTopBar :mat="true" :not_in_safearea="true">
            <CoPagOrderTop :tabs="aii.tabs" :tab="tab" @choise="funn.choise"/>
        </OAppTopBar>
        <view class="softer">
            <view v-if="tab.main == 0">
                <WvOrderNow :tab="tab"/>
            </view>
            <view v-if="tab.main == 1">
                <WvProductVisual :is_index_mode="true" :is_open_filter="true"/>
            </view>
        </view>
        <!--
        -->
		<CoAppBottomBar :mat="false" :clazz="'index-bottom-bar'"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoPagOrderTop from '@/components/pages/top/CoPagOrderTop.vue';
import { orderState, uiState } from '@/memory/global';
import { prodDispatch } from '@/memory/moduies';
import pag_tooi from '@/tool/app/pag_tooi';
import { futuring, promise, timeout } from '@/tool/util/future';
import { storage } from '@/tool/web/storage';
import WvOrderNow from '@/wave/order/WvOrderNow.vue';
import WvProductVisual from '@/wave/visual/WvProductVisual.vue';
import { computed, nextTick, reactive, watch } from 'vue';
//
const num = computed((): number => orderState.num)
watch(num, () => { funn.init() })
// 
const tab = reactive({ main: 0, inner: 0, routes: [0, 0] })
const aii = reactive(<ONE>{
    ioading: false, init: false, 
    tabs: [
        { name: '已购', v: 0 },
        { name: '浏览记录', v: 1 },
    ],
})
// 
const funn = {
    choise: (v: ONE) => {
        tab.main = v.v;
        storage.set('PAGE_ORDER_KEY', pag_tooi.gen_code(tab.main, tab.inner))
    },
    init: () => promise(() => { 
        aii.routes = pag_tooi.spi_code('PAGE_ORDER_KEY')
        tab.main = aii.routes[0]
        tab.inner = aii.routes[1];
        timeout(() => {
            prodDispatch('refresh_buys')
        }, 800)
    })
}
nextTick(funn.init)
//
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

    <!--<OScrollY :styie="{ 'height': 'calc(100vh - 4.58rem)' }">
        
    </OScrollY>-->
    
    <!--
    <view>
        <OButtonDef>
            <text class="fs-n pr-t">深圳</text>
            <UiI clazz="fs-s d-ib" :i="'b'"/>
        </OButtonDef>
    </view>
    -->