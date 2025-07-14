<template>
    <view>
        <OScrollX>
            <view class=" py fx-i">
                <view class="fx-c">
                    <OButtonTag @tap="funn.reset" color="def" clazz="fs-s px py">
                        清空
                    </OButtonTag>
                    <OButtonTag @tap="funn.search" color="def" clazz="fs-s px py">
                        查询
                    </OButtonTag>
                </view>
                <view class="fx-s">
                    <view>
                        <input v-model="me.orderDocId" class="inp-app fs-s btn-def br" placeholder="订单号"/>
                    </view>
                    <view>
                        <input v-model="me.userPhone" class="inp-app fs-s btn-def br" placeholder="用户手机"/>
                    </view>
                </view>
            </view>
        </OScrollX>
        <!-- -->
        <CoViDataLoading :ioading="aii.ioading" :items="aii.orders" @refresh="func.fetching">
            <view :class="isphone ? '' : 'row'">
                <view v-for="(v, i) in aii.orders" class="pb-row"
                    :class="w_clazz">
                    <view class="bg-con br-t o-h"
                        
                    >
                        <view class="py fx-aii-btn-def pi-row">
                            <view class="fs-w">
                                <text>订单号：</text>
                                <text class="us-a">{{ v.documentId }}</text>
                            </view>
                        </view>
                        <view>
                            <view v-for="(n, m) in order_tool.getcarts(v)" :k="m"
                                class="py-s fx-aii-btn-def fx-s fx-t pi-row"
                            >
                                <view class="fx-1">
                                    <CoMoOrderProductItem :v="n" />
                                </view>
                            </view>
                        </view>
                        <view class="fx-s pt-s">
                            <view class="fx-i px-row py-s fx-fcs-bg-def">
                                <view class="fs-s tid" @tap="funn.touchUserPhone(v)">
                                    <text class="">用户：</text>
                                    <text class="us-a">{{ v.userPhone }}</text>
                                </view>
                            </view>
                            <view class="fx-r px-row py-s fx-fcs-bg-def">
                                <view class="pi-s">
                                    <CkSimpleTag :clazz="'btn-def fx-c px-s'">
                                        <text class="fs-t cos">{{ times.fmts(v.createdAt) }}</text>
                                    </CkSimpleTag>
                                </view>
                                <view class="pi-s">
                                    <view>
                                        <OButtonTag @tap="func.pass(v)" color="err" :clazz="'fx-c px-s'">
                                            <text class="fs-t ">标为已支付</text>
                                        </OButtonTag>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </CoViDataLoading>

        <CoCoConfirm :idx="cfm.idx" :ioading="aii.ioading"
            @submit="func.setpay" @cancle="pan_tooi.close_pan(cfm.idx)"/>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_order from '@/server/order/server_order';
import { futuring, promise } from '@/tool/util/future';
import { is_nice_sn, must_arr, must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive, ref, watch } from 'vue';
import order_tool from '@/tool/modules/order_tool';
import CoMoOrderProductItem from './__component/CoMoOrderProductItem.vue';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import times from '@/tool/web/times';
import open_of_product from '@/server/__func/open_of_product';
import { orderDispatch, orderState, uiGetters } from '@/memory/global';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import net_tool from '@/tool/http/net_tool';
import server_checkout from '@/server/order/server_checkout';
import { DEV_DOC_ID } from '@/conf/conf-dev';
import CoCoConfirm from '@/components/common/CoCoConfirm.vue';
import pan_tooi from '@/tool/app/pan_tooi';
// 
const def = <ONE>{ name: '全部', v: 0 }
const house = reactive({ iive: def, tabs: [ def ], ioading: false })
const me = reactive({ ioading: false, orderDocId: '', userPhone: '' })
const aii = reactive({ ioading: false, edit: <XOrder>{ }, pager: net_tool.__pager_long(), orders: <XOrder[]>[ ] })
// 
const funn = {
    touchUserPhone: (v: XOrder) => {
        me.userPhone = v.userPhone; funn.search()
    },
    search: () => futuring(aii, async () => {
        await func.fetching()
        last_func.value = funn.search
    }),
    reset: () => futuring(aii, async () => {
        me.orderDocId = ''; me.userPhone = '';
        await func.fetching()
        last_func.value = funn.reset
    }),
    init: () => futuring(aii, async () => {
        await func.fetching()
        last_func.value = func.fetching
    }),
    chose: (one: ONE) => { house.iive = one; },
    checkIive: (one: ONE) => { const v = one.v; return house.iive.v === v; },
}
nextTick(funn.init)
// 
const last_func = ref()
//
const func = {
    view: (v: Page.CartDataOption) => futuring(house, async () => {
        await open_of_product.view(must_one(v.product))
    }),
    //
    pass: (v: XOrder) => {
        aii.edit = v
        pan_tooi.open_def_b(cfm.idx, cfm.hui)
    },
    fetching: async () => {
        const pm: ONE = { }
        //
        if (is_nice_sn(me.orderDocId)) {
            pm[DEV_DOC_ID] = me.orderDocId
        }
        if (is_nice_sn(me.userPhone)) {
            pm["userPhone"] = me.userPhone
        }

        const items: XOrder[] = await server_order.working(pm, aii.pager)
        if (items && items.length) {
            aii.orders = items
        }
    },
    // 设为已付款
    setpay: () => futuring(aii, async () => {
        const od: XOrder = aii.edit
        if (od && od.documentId) {
            const res: XOrder = await server_checkout.checkout(od)
            if (res && res.documentId) {
                pan_tooi.close_pan(cfm.idx)
                // last_func.value ? last_func.value() : undefined
                orderDispatch('refresh')
            }
        }
    })
}
const num = computed((): number => orderState.num)
watch(num, async () => { await func.fetching() })

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100 d-ib'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})

const cfm = { idx: 1, hui: <ElePanHui>{ opacity: 0.4 } }
</script>