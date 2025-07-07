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
                <view class="fx-i ps-r zi-n py-s ts px-s">
                    <view v-for="(v, i) in aii.tabs" :key="i" class="ts">
                        <OButton :color="(aii.iive == v.v) ? 'wht-s' : 'wht-s'" :weak="true" v-if="aii.iive == v.v" 
                            :clazz="'ts py-s px-row br-s mx-s'">
                            <text class="fw-550">{{ v.name }}</text>
                        </OButton>
                        <view @tap="aii.iive = v.v" class="ts py-s px-row fx-aii-btn-wht-s" v-else>
                            <text class="tid fs-w">{{ v.name }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </OAppTopBar>
        <view class="">
            <OScrollY :styie="{ 'height': 'calc(100vh - 8em)' }">
                <view class="pt-s"></view>
                <view v-if="aii.iive == 0">
                    <WvOrderNow/>
                </view>
                <view v-if="aii.iive == 1">
                    <WvOrderMine/>
                </view>
                <CkSpace :h="2"/>
            </OScrollY>
        </view>
		<CoAppBottomBar :mat="false"/>
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
import { uiGetters, uiState } from '@/memory/global';
import { promise } from '@/tool/util/future';
import { storage } from '@/tool/web/storage';
import WvIndexBanner from '@/wave_backend/index/WvIndexBanner.vue';
import WvOrderMine from '@/wave_backend/order/mine/WvOrderMine.vue';
import WvOrderNow from '@/wave_backend/order/WvOrderNow.vue';
import { computed, nextTick, reactive, watch } from 'vue';
//
const code = computed(() => { return storage.get('PAGE_ORDER_KEY') || 0 })

// 
const aii = reactive(<ONE>{
    ioading: false, iive: 0, init: false,
    tabs: [
        { name: '过单', v: 0 },
        { name: '我的产品', v: 1 },
    ],
})
// 
const funn = {
    init: () => promise(() => { aii.iive = code.value; })
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