<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con'" :mat="true" @back="uniRouter.back">
            <template #tit><view class="ta-c h6">结算</view></template>
        </CoAppTopBackBar>
        <view class="pt-s">
            <WvOrPag :aii="aii" :carts="carts_of_order" :num="num" :price="price"/>
            
            <view class="abs-b i-0 w-100 ps-f-imp bg-con py-s">
                <view class="w-100 fx-c px-row">
                    <OButton color="sec" clazz="mh-btn-x1 mw-8em br-imp fx-1"
                        :ioading="aii.ioading" @tap="funn.submit()"
                    >
                        <text>结算</text>
                        <text class="fw-700">
                            <text class="fs-s px-t">￥</text>
                            <text>{{ price }}</text>
                        </text>
                    </OButton>
                </view>
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { DATA_PAYMENT_WAY_DEF } from '@/conf/conf-datas';
import { authState, orderState, uiState } from '@/memory/global';
import { pageCartDispatch, pageCartState } from '@/memory/page';
import server_checkout from '@/server/order/server_checkout';
import cart_tool from '@/tool/modules/cart_tool';
import auth_tool from '@/tool/modules/common/auth_tool';
import order_tool from '@/tool/modules/order_tool';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { futuring, promise } from '@/tool/util/future';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import WvOrPag from '@/wave/order/ready/WvOrPag.vue';
import { computed, nextTick, reactive } from 'vue';
//
//
const aii = reactive(<ONE>{
    ioading: false, payway: DATA_PAYMENT_WAY_DEF.code
})
const carts_of_order = computed((): Page.CartDataOptions => must_arr(pageCartState.carts_of_order))

const num = computed((): number => cart_tool.getnum_total(carts_of_order.value))
const price = computed((): number => cart_tool.getprice_total(carts_of_order.value))

const funn = {
    init: () => promise(() => {
        if (num.value == 0) {
            uniRouter.back()
        }
    }),
    vid: (): boolean => {

        return true
    },

    submit: () => auth_tool.doac(async () => {
        if (funn.vid()) {
            func.first()
        }
    })
}

const func = {
    first: () => futuring(aii, async () => {
        const data: XOrder = order_tool.group_order_data({
            num: num.value, price: price.value
        }, authState.user, carts_of_order.value);
        // 先新增一个订单
        const src: XOrder = await server_checkout.plus( data )
        if (src && src.documentId) {
            await func.paying(src)
        }
    }),
    paying: async (xorder: XOrder) => {
        console.log('打开支付页面');

        // 手动支付完成
        const src: XOrder = await server_checkout.checkout( xorder )

        if (src && src.documentId) {
            func.success()
        }
    },
    success: () => {
        pageCartDispatch('carts_clean', carts_of_order.value)
        appRouter.order_succ()
    }
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>
