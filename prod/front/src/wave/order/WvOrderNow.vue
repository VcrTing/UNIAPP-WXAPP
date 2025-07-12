<template>
    <view>
        <OScrollX>
            <view class=" py fx-i softer mxw-pc">
                <view class="btn-def py px-row ts c-p softer" v-for="(v, i) in menus" :key="i"
                    @tap="funn.chose(v)"
                >
                    <text :class="(tab.inner === v.v) ? '' : 'sus'">{{ v.name }}</text>
                </view>
            </view>
        </OScrollX>
        <!-- -->
        <CoViDataLoading :ioading="aii.ioading" :items="aii.orders" @refresh="funn.fetching">
            <view class="mxw-pc">
                <view v-for="(v, i) in aii.orders" class="pb-row">
                    <view class="bg-con pt-s" :class="isphone ? '' : 'br'">
                        <view>
                            <view v-for="(n, m) in order_tool.getcarts(v)" :k="m"
                                :class="w_clazz"
                            >
                                <view
                                    :class="isphone ? 'br-1' : 'br-s'"
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
                            
                        </view>
                        <view class="">
                            <view class="fx-r px-row py-s fx-fcs-bg-def br-br br-bi c-p" @tap="func.ordermsg(v)">
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
                                            <text class="fs-t ">未支付，点击查看订单号</text>
                                        </CkSimpleTag>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </CoViDataLoading>

        <WvOrderMsgPan :idx="pan_msg.idx" :v="house.view"/>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_order from '@/server/order/server_order';
import { futuring, promise } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive, watch } from 'vue';
import order_tool from '@/tool/modules/order_tool';
import CoMoOrderProductItem from './__component/CoMoOrderProductItem.vue';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import times from '@/tool/web/times';
import open_of_product from '@/server/__func/open_of_product';
import { pageCartState } from '@/memory/page';
import WvOrderMsgPan from './pan/WvOrderMsgPan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import net_tool from '@/tool/http/net_tool';
import { authGetters, orderState, uiGetters } from '@/memory/global';

const prp = defineProps<{
    tab: ONE
}>()
//
const num = computed((): number => orderState.num)
watch(num, () => { funn.__fetching() })

// 
const def = <ONE>{ name: '全部', v: 0 }
const house = reactive({
    tabs: [ def, { name: '已购商品', v: 1 } ], ioading: false, view: <XOrder>{ }
})
const aii = reactive({ ioading: false, pager: net_tool.__pager_long(), orders: <XOrder[]>[ ] })
// 
const funn = {
    __fetching: async () => {
        if (authGetters.is_login) {
            const items: XOrder[] = await server_order.mine({ }, aii.pager)
            if (items && items.length) {
                aii.orders = items
            }
        }
    },
    fetching: () => futuring(aii, async () => {
        await funn.__fetching()
    }),
    init: () => promise(() => {
        funn.fetching()
    }),
    chose: (one: ONE) => { 
        if (prp.tab.inner === one.v) {
            funn.init()
        }
        prp.tab.inner = one.v; 
    },
    checkIive: (one: ONE) => { const v = one.v; return prp.tab.inner === v; },
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
    ordermsg: (v: XOrder) => futuring(aii, async () => {
        house.view = v; pan_tooi.open_def_t(pan_msg.idx, pan_msg.hui)
    }),
    view: (v: Page.CartDataOption) => futuring(house, async () => {
        await open_of_product.view_buy(must_one(v.product))
    })
}

const pan_msg = { idx: 22, hui: <ElePanHui>{ opacity: 0.4 } }

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-50 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>