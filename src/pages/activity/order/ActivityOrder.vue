<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="''" :mat="true" @back="uniRouter.back">
            <template #tit><view class="ta-c h6"></view></template>
        </CoAppTopBackBar>
        <!--
        <CoAppTopBar :mat="true">
            返回
        </CoAppTopBar>-->
        <view class="px-row pt">
            <view class="card pr-x2 pi-x2 pt-x2 pb ts">
                <view>
                    <VwActivitySingleDetail :item="order_of_place"/>
                </view>
            </view>
            <!--
            <view class="pt"></view>
            <view>
                <VwActivityOrderAssistant :item="order_of_place"/>
            </view>-->
            <view class="pt"></view>
            <view class="card pr-x2 pi-x2 pt-x2 pb ts">
                <view class="header-s pb">订单信息</view>
                <view>
                    <VwActivityOrderMsg :item="order_of_place"/>
                </view>
            </view>
            <view class="py-row">
                <CoMoSecurityAgreeLine :aii="aii">
                    <text class="tit">表示您已经同意并且阅读平台</text>
                    <text class="pri" @tap="funn.look(1)">《免责申明》</text>
                    <text class="pri" @tap="funn.look(0)"></text>
                </CoMoSecurityAgreeLine>
            </view>
            <CkSpace :h="8"/>
        </view>
        <CoAppBomFuncBar :clazz="'bg-pag-pri'" :mat="true">
            <view class="w-100 px-row pt pb-x1 ">
                <OButton clazz="mh-btn" @tap="funn.submit">
                    <view>
                        <text class="h7">确认支付&nbsp;</text>
                        <text class="h6">￥<text class="fw-550">69.00</text></text>
                    </view>
                </OButton>
            </view>
        </CoAppBomFuncBar>
    </PageLayout>
</template>

<script setup lang="ts">
// 5月13日：改动新薏的出货单打印功能，实现聂张帆的样衣借出记录的改动，
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomFuncBar from '@/components/app/bar/bom/CoAppBomFuncBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoMoSecurityAgreeLine from '@/components/modules/security/CoMoSecurityAgreeLine.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { must_one } from '@/tool/util/valued';
import VwActivityOrderAssistant from '@/view/activity/order/VwActivityOrderAssistant.vue';
import VwActivityOrderMsg from '@/view/activity/order/VwActivityOrderMsg.vue';
import VwActivitySingleDetail from '@/view/activity/order/VwActivitySingleDetail.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()

const order_of_place = computed(() => {
    return orderState.order_of_place
})

const assistant = computed(() => must_one<ONE>(order_of_place.value).assistant || { })

const aii = reactive({
    agree: false
})

const funn = {
    look: (v: number) => {

    },
    submit: () => {
        console.log('加入订单 =', order_of_place.value)
        // orderDispatch('place_an_order', order_of_place.value)
        appRouter.order_succ()
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *

page, uni-page-body
	background: $pri-pag-bg
</style>