<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :h="68">
            <template #bg>
                <view class="h-42vh">
                    <image mode="aspectFill" class="uni-img w-100 h-100" :src="view.banner"/>
                </view>
            </template>
            <template #top>
                <CoAppTopBackBar @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
            </template>
            <template #con>
                <view class="px-row pb-col">
                    <VwActivityDetailPublisher :one="view"/>
                </view>
                <view class="pt-s bg-hui"></view>
                <view class="px-row">
                    <VwActivityDetailAddrTime :one="view"/>
                </view>
                <view class="pt-s bg-hui"></view>
                <view class="px-row">
                    <VwActivityDetailContent :one="view"/>
                </view>
            </template>
            <template #bom>
                <view class="px-row w-100">
                    <OButtonDef v-if="is_publisher" clazz="w-100 mh-btn" @tap="uniRouter.back">返回</OButtonDef>
                    <CoBomBtnGroup :tit="'立即加入'" v-else @submit="funn.join" @cancle="uniRouter.back"></CoBomBtnGroup>
                    <OSafeAreaBottom/>
                </view>
            </template>
        </DetailLayout>

        <VwAdPricePan
            @submit="funn.submit"
            :one="view" :idx="aii.price_pan_idx"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authGetters, authState, orderReFresh, uiState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import VwAdPricePan from '@/view/activity/detail/pan/VwAdPricePan.vue';
import VwActivityDetailAddrTime from '@/view/activity/detail/VwActivityDetailAddrTime.vue';
import VwActivityDetailContent from '@/view/activity/detail/VwActivityDetailContent.vue';
import VwActivityDetailPublisher from '@/view/activity/detail/VwActivityDetailPublisher.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const view = computed(() => acyState.view)
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
        pan_tooi.open_def_b(aii.price_pan_idx, aii.hui)
    },
    back: () => {
        uniRouter.back()
    }
}
</script>