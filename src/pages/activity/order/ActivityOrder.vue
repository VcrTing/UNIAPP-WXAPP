<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBar :clazz="''" :mat="true">
            <view>
                <view class="btn fx-i py-s">
                    <view class="pi-row pr-s" @tap="uniRouter.back">
                        <OFI class="w-1em h-1em" :i="'i'"/>
                    </view>
                    <view>返回</view>
                </view>
            </view>
        </CoAppTopBar>
        <!--
        <CoAppTopBar :mat="true">
            返回
        </CoAppTopBar>-->
        <view class="px-row">
            <view class="card pa-card ts">
                <view>
                    <VwActivitySingleDetail :item="order_of_place"/>
                </view>
            </view>
            <view class="pt"></view>
            <view>
                <VwActivityOrderAssistant :item="order_of_place"/>
            </view>
            <view class="pt"></view>
            <view class="card pa-card ts">
                <view class="header-s pb pt-s">订单信息</view>
                <view>
                    <VwActivityOrderMsg :item="order_of_place"/>
                </view>
                <view class="fx-c pt">
                    <view class="w-618">
                        <OButton clazz="mh-btn" @tap="funn.submit">支付</OButton>
                    </view>
                </view>
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
// 5月13日：改动新薏的出货单打印功能，实现聂张帆的样衣借出记录的改动，
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { must_one } from '@/tool/util/valued';
import VwActivityOrderAssistant from '@/view/activity/order/VwActivityOrderAssistant.vue';
import VwActivityOrderMsg from '@/view/activity/order/VwActivityOrderMsg.vue';
import VwActivitySingleDetail from '@/view/activity/order/VwActivitySingleDetail.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const order_of_place = computed(() => {
    return orderState.order_of_place
})

const assistant = computed(() => must_one<ONE>(order_of_place.value).assistant || { })

const funn = {
    submit: () => {
        console.log('加入订单 =', order_of_place.value)
        orderDispatch('place_an_order', order_of_place.value)
        uniRouter.navigatorpg('order')
    }
}
</script>

<style lang="sass" scoped>
@use '../../../ui/sass/theme/primary' as *

page, uni-page-body
	background: $pri-pag-bg
</style>