<template>
    <view>
        <OScrollX>
            <view class=" py ">
                <view class="d-ib pr softer" v-for="(v, i) in menus" :key="i"
                    @click="funn.chose(v)"
                    >
                    <view class="ts py-s fx-c fw-500 br-rnd c-p ani-scaie-aii"
                        :class="funn.checkIive(v) ? v.__clazz_iive : v.__clazz_die">
                        <text>{{ v.name }}</text>
                    </view>
                </view>
            </view>
        </OScrollX>
        <!-- -->
        <CoViDataLoading :ioading="aii.ioading" :items="aii.orders" @refresh="funn.fetching">
            <view>
                <view>

                </view>
                <view v-for="(v, i) in aii.orders" class="pb-row">
                    <view class="bg-con pt-s">
                        <view>
                            <view v-for="(n, m) in order_tool.getcarts(v)" :k="m"
                                class="py-s fx-aii-btn-def fx-s fx-t"
                            >
                                <view class="pi-row pr-s sus">
                                    <view class="mw-1em">{{ m + 1 }}</view>
                                </view>
                                <view class="fx-1">
                                    <CoMoOrderProductItem :v="n" @view="func.view" />
                                </view>
                            </view>
                        </view>
                        <view class="">
                            <view class="fx-r px-row py-s fx-fcs-bg-def">
                                <view class="pi-s">
                                    <CkSimpleTag :clazz="'btn-def fx-c px-s'">
                                        <text class="fs-t tis">{{ times.fmts(v.createdAt) }}</text>
                                    </CkSimpleTag>
                                </view>
                                <view class="pi-s">
                                    <view v-if="order_tool.ispayed(v)">
                                        <CkSimpleTag :clazz="'btn-def fx-c px-s'">
                                            <text class="fs-t cos">已支付</text>
                                        </CkSimpleTag>
                                    </view>
                                    <view v-else>
                                        <CkSimpleTag :clazz="'btn-err fx-c px-s'">
                                            <text class="fs-t ">未支付</text>
                                        </CkSimpleTag>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </CoViDataLoading>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_order from '@/server/order/server_order';
import { futuring, promise } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';
import order_tool from '@/tool/modules/order_tool';
import CoMoOrderProductItem from './__component/CoMoOrderProductItem.vue';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import times from '@/tool/web/times';
import open_of_product from '@/server/__func/open_of_product';
// 
const def = <ONE>{ name: '全部', v: 0 }
const house = reactive({
    iive: def, tabs: [
        def,
        // { name: '经常浏览', v: 1 },
    ], ioading: false
})
const aii = reactive({ ioading: false, pager: <Pager>{ }, orders: <XOrder[]>[ ] })
// 
const funn = {
    fetching: () => futuring(aii, async () => {
        const items: XOrder[] = await server_order.mine({ }, aii.pager)
        if (items && items.length) {
            aii.orders = items
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    }),
    chose: (one: ONE) => { 
        if (house.iive === one) {
            funn.init()
        }
        house.iive = one; 
    },
    checkIive: (one: ONE) => { const v = one.v; return house.iive.v === v; },
}
nextTick(funn.init)
// 
const menus = computed((): ONE[] => {
    return must_arr(house.tabs).map((e: ONE) => {
        e['__clazz_die'] = 'fs-n px-row tis fx-aii-btn-wht-s'
        e['__clazz_iive'] = 'fs-n px-x1 fx-aii-btn-def'
        return e
    })
})
//
const func = {
    view: (v: Page.CartDataOption) => futuring(house, async () => {
        await open_of_product.view_buy(must_one(v.product))
    })
}
</script>