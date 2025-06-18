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
        <view class="pt">
            <view class="px-row">
                <CoMoOrderPayingItem :v="order_of_place.one">
                </CoMoOrderPayingItem>
                <view class="pt"></view>
                <view class="card pt-x2 pb ts">
                    <view class="header-s pb px-x1">订单信息</view>
                    <view>
                        <VwActivityOrderMsg :item="order_of_place"/>
                    </view>
                </view>
            </view>
            <view class="py-row">
                <CoMoSecurityAgreeLine :canedit="true" ref="agree"/>
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
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomFuncBar from '@/components/app/bar/bom/CoAppBomFuncBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoMoOrderPayingItem from '@/components/modules/activity/order/CoMoOrderPayingItem.vue';
import CoMoSecurityAgreeLine from '@/components/modules/security/CoMoSecurityAgreeLine.vue';
import { for_user_joing } from '@/conf/__for_index/for_user_loging';
import { authState, orderDispatch, orderState, uiState } from '@/memory/global';
import server_joining from '@/server/activity/server_joining';
import join_tool from '@/tool/modules/join_tool';
import appRouter from '@/tool/uni/app-router';
import { tipsucc } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { futuring, promise } from '@/tool/util/future';
import VwActivityOrderMsg from '@/view/activity/order/VwActivityOrderMsg.vue';
import { computed, nextTick, reactive } from 'vue';

// const prp = defineProps<{}>()

const order_of_place = computed((): OrderItem => {
    return orderState.order_of_place
})

const aii = reactive({
    agree: false, ioading: false,
})

const funn = {
    look: (v: number) => {

    },
    succ: () => {
        try {
            tipsucc('加入该活动成功。');
            appRouter.order_succ()
        }
        finally { for_user_joing() }
    },
    submit: () => futuring(aii, async () => {
        const o: OrderItem = order_of_place.value
        const form: ONE = join_tool.build_plus_form(o.one, o.joiner);
        const src: ActivityJoin = await server_joining.join(form)
        if (src.documentId) { funn.succ() }
    }),
    init: () => promise(() => {
        const o: OrderItem = order_of_place.value
        const a: Activity = o.one || { }
        if (!a.documentId) {
            uniRouter.back()
        }
    })
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *

page, uni-page-body
	background: $pri-pag-bg
</style>


            <!--
            <view class="card pr-x2 pi-x2 pt-x2 pb ts">
                <view>
                    <VwActivitySingleDetail :item="order_of_place"/>
                </view>
            </view>
            <view class="pt"></view>
            <view>
                <VwActivityOrderAssistant :item="order_of_place"/>
            </view>-->