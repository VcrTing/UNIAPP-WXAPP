<template>
    <view class="">
        <Ov>
            <view class="fx-r py tiw px-row">
                <text class="fs-n">{{ carts.length }}</text>
                <text class="fs-s">条记录</text>
            </view>
        </Ov>
        <view>
            <view v-for="(v, i) in carts" :key="i" class="pb-row" >
                <view class="fx-s bg-con py">
                    <view class="px-row py-x1" @tap="funn.choise(v)">
                        <OCheckBox :clazz="'fs-s'" :iive="func.has(v)" :clazz_die="'btn-def'"/>
                    </view>
                    <view class="fx-1">
                        <CoMoCartProductItem :v="v" @view=""
                            @add="func.add" @min="func.min" />
                    </view>
                </view>
            </view>
        </view>
        <!-- -->
        <CkSpace :h="3"/>
        <view class="pt"></view>
        <view class="mh-app-bottom-bar"></view>
        <view class="abs-b i-0 w-100 ps-f-imp bg-con py-s">
            <view class="w-100">
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
                            <text>结算</text>
                            <text v-if="is_nice_arr(choises)" class="pi-t">({{ choises.length }})</text>
                        </OButton>
                    </view>
                </view>
            </view>
            <view class="pt"></view>
            <view class="mh-app-bottom-bar"></view>
        </view>
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
import { futuring, promise } from '@/tool/util/future';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';
import CoMoCartProductItem from './__component/CoMoCartProductItem.vue';
import { tipwarn } from '@/tool/uni/uni-global';
import appRouter from '@/tool/uni/app-router';
import OCheckBox from '@/cake/input/check/OCheckBox.vue';
import open_of_product from '@/server/__func/open_of_product';
//
const prp = defineProps<{
    carts: Page.CartDataOptions,
    choises: string[]
}>()

const me = reactive({ ioading: false })
const cartchoise = computed((): Page.CartDataOptions => { return cart_tool.coii_choise_carts(prp.carts, prp.choises) })

const func = {
    has: (v: Page.CartDataOption) => {
        const docid: string = v[ DEV_DOC_ID ]
        return prp.choises.indexOf(docid) >= 0
    },
    add: (v: Page.CartDataOption) => futuring(me, async () => {
        await pageCartDispatch('cart_add', v.product)
    }),
    min: (v: Page.CartDataOption) => futuring(me, async () => {
        await pageCartDispatch('cart_min', v.product)
    })
}

const funn = {
    view: (v: Product) => {
        open_of_product.view(v)
    },

    choise: (v: Page.CartDataOption) => futuring(me, async () => {
        const docid: string = v[ DEV_DOC_ID ]
        const i: number = prp.choises.indexOf(docid)
        //
        if (i >= 0) {
            prp.choises.splice(i, 1); console.log('减去 =', i)
        }
        else {
            prp.choises.push(docid); console.log('加上 =', i)
        }
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
    })
}
</script>