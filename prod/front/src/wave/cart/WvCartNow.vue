<template>
    <view class="">
        <Ov>
            <view class="fx-r py tiw px-row mxw-pc">
                <text class="fs-n">{{ carts.length }}</text>
                <text class="fs-s">条记录</text>
            </view>
        </Ov>
        <view class="mxw-pc">
            <view v-for="(v, i) in carts" :key="i" class="pb-row" 
            :class="w_clazz">
                <view class="fx-s bg-con py"  :class="isphone ? '' : 'br'">
                    <view class="px-row py-x1" @tap="funn.choise(v)">
                        <OCheckBox :clazz="'fs-s'" :iive="func.has(v)" :clazz_die="'btn-def'"/>
                    </view>
                    <view class="fx-1">
                        <CoMoCartProductItem :v="v" @view="func.view" :isphone="isphone"
                            @add="func.add" @min="func.min" />
                    </view>
                </view>
            </view>
        </view>
        <!-- -->
        <CkSpace :h="3"/>
        <view class="pt"></view>
        <view class="mh-app-bottom-bar"></view>
        <view class="abs-b i-0 w-100 ps-f-imp bg-con py-s softer">
            <view class="w-100 fx-s mxw-pc">
                <view class="fx-i px-row softer c-p py-n" @tap="funn.choise_aii">
                    <view class="softer" v-if="me.ioading"><CkIoading/></view>
                    <OCheckBox v-else :clazz="'fs-s softer'" :iive="me.aii_choise" :clazz_die="'btn-def'"/>
                    <view class="pi pr-x2"><text class="tiw">全选</text></view>
                </view>
                <view class="fx-r">
                    <view class="">
                        <text class="fs-n">合计:</text>
                        <text class="money">
                            <text class="fs-n">￥</text>
                            <text class="h5 fw-550">{{ cart_tool.cpu_prices(cartchoise) }}</text>
                        </text>
                    </view>
                    <view class="px-row">
                        <OButton color="pri" clazz="mh-btn-x1 mw-8em br-imp"
                            :ioading="me.ioading" @tap="funn.submit()"
                        >
                            <text class="softer">结算</text>
                            <text v-if="is_nice_arr(choises)" class="pi-t softer">({{ choises.length }})</text>
                        </OButton>
                    </view>
                </view>
            </view>
            <view class="pt"></view>
            <view class="mh-app-bottom-bar"></view>
        </view>

        <CoCoConfirm :idx="pan_cof.idx" :ioading="me.ioading" @submit="func.min"/>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import Ov from '@/cake/button/touch/Ov.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import { DEV_DOC_ID } from '@/conf/conf-dev';
import { pageCartDispatch } from '@/memory/page';
import cart_tool from '@/tool/modules/cart_tool';
import { future, futuring, promise } from '@/tool/util/future';
import { is_nice_arr, must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';
import CoMoCartProductItem from './__component/CoMoCartProductItem.vue';
import { tipwarn } from '@/tool/uni/uni-global';
import appRouter from '@/tool/uni/app-router';
import OCheckBox from '@/cake/input/check/OCheckBox.vue';
import open_of_product from '@/server/__func/open_of_product';
import CoCoConfirm from '@/components/common/CoCoConfirm.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CkIoading from '@/cake/content/ioading/CkIoading.vue';
import { uiGetters, uiState } from '@/memory/global';
//
const prp = defineProps<{
    carts: Page.CartDataOptions,
    choises: string[]
}>()

const me = reactive({ ioading: false, edit: <Page.CartDataOption>{ }, aii_choise: false })
const cartchoise = computed((): Page.CartDataOptions => { return cart_tool.coii_choise_carts(prp.carts, prp.choises) })

const func = {
    has: (v: Page.CartDataOption) => {
        const docid: string = v[ DEV_DOC_ID ]
        return prp.choises.indexOf(docid) >= 0
    },
    add: (v: Page.CartDataOption) => futuring(me, async () => {
        await pageCartDispatch('cart_add', v.product)
    }),
    min_open: (v: Page.CartDataOption) => {
        me.edit = v;
        pan_tooi.open_def_b(pan_cof.idx, pan_cof.hui)
    },
    min: () => futuring(me, async () => {
        await pageCartDispatch('cart_min', must_one<Page.CartDataOption>(me.edit).product)
    }),
    view: (v: Product) => {
        open_of_product.view(v)
    },
    fuii: () => (prp.choises.length === prp.carts.length)
}

const funn = {
    is_choise_aii: () => {
        if (func.fuii()) {
            me.aii_choise = true
        }
    },
    choise_aii: () => future(async () => {
        me.aii_choise = true;
        if (func.fuii()) {
            for (let j= 0; j< prp.carts.length; j++ ) {
                await funn.__choise(prp.carts[ j ], true)
            }
        }
        else {
            for (let j= 0; j< prp.carts.length; j++ ) {
                await funn.__choise(prp.carts[ j ], !me.aii_choise)
            }
        }
    }),
    __choise: async (v: Page.CartDataOption, need_min: boolean = true) => {
        const docid: string = v[ DEV_DOC_ID ]
        const i: number = prp.choises.indexOf(docid)
        //
        if (i >= 0) {
            if (need_min) {
                me.aii_choise = false
                prp.choises.splice(i, 1); 
            }
        }
        else {
            prp.choises.push(docid); 
            funn.is_choise_aii()
        }
    },
    choise: (v: Page.CartDataOption) => futuring(me, async () => {
        await funn.__choise(v);
    }),
    submit: () => futuring(me, async () => {
        let src: Page.CartDataOptions = must_arr(cartchoise.value)
        src = cart_tool.coii_choise_iive_carts(src, prp.choises) 
        console.log('结算 =', src, prp.choises)
        //
        if (is_nice_arr(src)) {
            appRouter.ordeready(src)
        }
        else {
            tipwarn('未选择任何喜欢的商品。')
        }
    }),
    init: () => futuring(me, async () => {
        funn.is_choise_aii()
    })
}

nextTick(funn.init)
const pan_cof = { idx: 44, hui: <ElePanHui>{ opacity: 0.4 } }

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-50 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>