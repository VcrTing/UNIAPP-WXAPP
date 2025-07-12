<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <OAppTopBar :mat="true" :not_in_safearea="true">
            <view class="ps-r zi-t o-h">
                <view class="abs-b i-0 w-100 h-100 zi-s">
                    <WvIndexBanner :h="h_v"/>
                </view>
                <OSafeAreaTop/>
                <!-- -->
                <view class="mxw-pc" :class="isphone ? 'px-s' : ''">
                    <view class="fx-i ps-r zi-n py-s ts">
                        <view v-for="(v, i) in aii.tabs" :key="i" class="ts">
                            <OButton :color="(tab.main == v.v) ? 'wht-s' : 'wht-s'" :weak="true" v-if="tab.main == v.v" 
                                :clazz="'ts py-s px-row br-s'">
                                <text class="fw-550">{{ v.name }}</text>
                            </OButton>
                            <view @tap="funn.choise(v)" class="ts py-s px-row fx-aii-btn-wht-s mx-s br-s c-p" v-else>
                                <text class="tid fs-w">{{ v.name }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </OAppTopBar>
        <view class="">
            <OScrollY :styie="{ 'height': 'calc(100vh - 4.58rem)' }">
                <view class="pt-s"></view>
                <view v-if="tab.main == 0">
                    <WvOrderNow :tab="tab"/>
                </view>
                <view v-if="tab.main == 1">
                    <WvProductVisual :is_index_mode="true" :is_open_filter="true"/>
                </view>
                <CkSpace :h="2"/>
            </OScrollY>
        </view>
		<CoAppBottomBar :mat="false" :clazz="'index-bottom-bar'"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiGetters, uiState } from '@/memory/global';
import { prodDispatch } from '@/memory/moduies';
import pag_tooi from '@/tool/app/pag_tooi';
import { futuring, promise, timeout } from '@/tool/util/future';
import { storage } from '@/tool/web/storage';
import WvIndexBanner from '@/wave/index/WvIndexBanner.vue';
import WvOrderNow from '@/wave/order/WvOrderNow.vue';
import WvProductVisual from '@/wave/visual/WvProductVisual.vue';
import { computed, nextTick, reactive, watch } from 'vue';
//

const num = computed((): number => orderState.num)
watch(num, () => { funn.init() })
// 

const tab = reactive({
    main: 0, inner: 0, routes: [0, 0],
})
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
        storage.set('PAGE_ORDER_KEY', 0)
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
const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const h_v = computed((): string => { return h.value + 'px' })
const h = computed((): number => { if (ispc.value) return 52; return isphone.value ? 0 : 120 })
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

                <!--
                <view>
                    <OButtonDef>
                        <text class="fs-n pr-t">深圳</text>
                        <UiI clazz="fs-s d-ib" :i="'b'"/>
                    </OButtonDef>
                </view>
                -->