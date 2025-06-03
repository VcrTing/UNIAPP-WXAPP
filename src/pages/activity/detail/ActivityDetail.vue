<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :h="68">
            <template #bg>
                <VwActivityDetailBanner :one="view" :h="'34vh'"/>
            </template>
            <template #top>
                <CoAppTopBackBar @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
            </template>
            <template #con>
                <view class="px-row pb-col">
                    <VwActivityDetailTitle :one="view"/>
                </view>
                <view class="px-row">
                    <VwActivityDetailAddrTime :one="view"/>
                </view>
                <view class="pt-s bg-hui"></view>
                <view class="px-row pb-col">
                    <!--
                    <VwActivityDetailPublisher :one="view"/>
                    -->
                    <VwActivityDetailJoiner :one="view"/>
                </view>
                <view class="pt-s bg-hui"></view>
                <view class="px-row">
                    <VwActivityDetailContent :one="view"/>
                </view>
                <view class="">
                    <VwActivityDetailGallery :one="view"/>
                </view>
                <CkSpace :h="2"/>
                <view class="mh-app-bottom-bar"></view>
            </template>
            <template #bom>
                <view class="px-row w-100 bg-con pt-s">
                    <OButtonDef v-if="is_publisher" clazz="w-100 mh-btn" @tap="uniRouter.back">返回</OButtonDef>
                    <CoBomBtnGroup :tit="'立即加入'" v-else @submit="funn.join" @cancle="uniRouter.back"></CoBomBtnGroup>
                    <OSafeAreaBottom/>
                </view>
            </template>
        </DetailLayout>

        <!--
        <VwAdPricePan
            @submit="funn.submit"
            :one="view" :idx="aii.price_pan_idx"/>
            -->
    </PageLayout>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authGetters, authState, orderReFresh, uiState } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import pan_tooi from '@/tool/app/pan_tooi';
import activity_tool from '@/tool/modules/activity_tool';
import uniRouter from '@/tool/uni/uni-router';
import VwActivityDetailAddrTime from '@/view/activity/detail/VwActivityDetailAddrTime.vue';
import VwActivityDetailBanner from '@/view/activity/detail/VwActivityDetailBanner.vue';
import VwActivityDetailContent from '@/view/activity/detail/VwActivityDetailContent.vue';
import VwActivityDetailGallery from '@/view/activity/detail/VwActivityDetailGallery.vue';
import VwActivityDetailJoiner from '@/view/activity/detail/VwActivityDetailJoiner.vue';
import VwActivityDetailTitle from '@/view/activity/detail/VwActivityDetailTitle.vue';
import { computed, nextTick, onMounted, reactive } from 'vue';

const view = computed((): Activity => acyState.view)
const user = computed(() => authState.user)

const aii = reactive({
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const is_publisher = computed(() => authGetters.is_publisher)

const funn = {
    submit: (src: ONE) => {
        
        const order = {
            one: view,
            assistant: src.assistant,
            buyer: user,
            msg: {
                
                createTime: '2025-05-05 12:23',
            }
        }
        orderReFresh('order_of_place', order); uniRouter.gopg('activity_order')
    },
    join: () => {
        funn.submit({
            assistant: mock_orders.assistant
        })
        // pan_tooi.open_def_b(aii.price_pan_idx, aii.hui)
    },
    back: () => {
        uniRouter.back()
    },
    init: () => {
    }
}

onMounted(() => {
    pan_tooi.close_pan(aii.price_pan_idx)
})

nextTick(funn.init)
</script>