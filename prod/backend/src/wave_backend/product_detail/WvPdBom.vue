<template>
    <view class="w-100 softer">
        <view class="softer" v-if="modback">
            <CoBomBackBtn :clazz="'btn-wht-s'"/>
        </view>
        <view v-else class="">
            <view class="w-100 bg-con softer abs-b i-0 ps-f-imp">
                <view class="fx-s mxw-pc">
                    <view class="fx-1 fx-i">
                        <Ov clazz="ta-c pt-s pb-s" @tap="uniRouter.back">
                            <view class="px-x2 h-1em h8">
                                <UiI i="i" clazz=""/>
                            </view>
                            <view class="tis pt-s"><text class="fs-s">返回</text></view>
                        </Ov>
                        <Ov clazz="ta-c pt-s pb-s" @tap="funn.share">
                            <view class="px-x2 h-1em h8">
                                <UiI i="share" clazz=""/>
                            </view>
                            <view class="tis pt-s"><text class="fs-s">分享</text></view>
                        </Ov>
                    </view>
                    <view class="px-row w-618">
                        <OButton v-if="sts.is_join" clazz="btn-app"
                            color="def" @tap="uniRouter.back"
                        >
                            <text class="">您已拥有。</text>
                        </OButton>
                        <view v-else class="softer">
                            <OButton v-if="price == 0" clazz="btn-app"
                                color="def" @tap="uniRouter.back"
                            >
                                <text class="">免费</text>
                            </OButton>
                            <view v-else>
                                <view class="fx-r">
                                    <OButton
                                        :ioading="aii.ioading" :weak="true"
                                        clazz="mh-btn-x1 br-ti br-bi pr pi-x1 mw-6em" @tap="funn.car">
                                        <view class="fx-c" v-if="sts.is_in_cart">
                                            <UiI i="check"/>
                                            <text class="pi-s">已加购</text>
                                        </view>
                                        <view class="fx-c" v-else>
                                            <UiI i="cart"/>
                                            <text class="pi-s">加购</text>
                                        </view>
                                    </OButton>
                                    <OButton color="sec"
                                        :ioading="aii.ioading" :weak="true"
                                        clazz="mh-btn-x1 br-tr br-br pi pr-x1 mw-6em" @tap="funn.buy">
                                        <view class="">
                                            <text class="h8">￥</text>
                                            <text class="h7 fw-550">{{ price }}</text>
                                            <text>元</text>
                                        </view>
                                    </OButton>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <CkSpace :h="8"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import Ov from '@/cake/button/touch/Ov.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import { orderReFresh } from '@/memory/global';
import { pageCartDispatch } from '@/memory/page';
import cart_tool from '@/tool/modules/cart_tool';
import auth_tool from '@/tool/modules/common/auth_tool';
import product_tool from '@/tool/modules/product_tool';
import appRouter from '@/tool/uni/app-router';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{ 
    v: Product, user: User, sts: ONE,
    is_publisher: boolean
}>()

const aii = reactive({ ioading: false })

const modback = computed((): boolean => {
    if (prp.sts.is_buyed) return true
    return prp.is_publisher || (price.value == 0)
})

const func = {
    submit_car: async () => {
        await pageCartDispatch('cart_add', prp.v)
        prp.sts.is_in_cart = true
    },
    submit_buy: async () => {
        const carts: Page.CartDataOptions = cart_tool.generate(prp.v)
        appRouter.ordeready(carts)
    },
}

const funn = {
    vid: () => {
        // 是否已买
        if (prp.sts.is_buyed) {
            tipwarn('您已经买入了该产品。')
            return false
        }

        const newset: Product = prp.v || { }
        const startTime = newset.startSellTime
        // 简单检查库存
        // 检查在售时间
        // 过
        return true;
    },
    car: () => auth_tool.doacing(aii, async () => {
        if (funn.vid()) {
            if (prp.sts.is_in_cart) {
                tipwarn('已加入购物车啦。')
            }
            else {
                func.submit_car()
            }
        }
    }),
    buy: () => auth_tool.doacing(aii, async () => {
        if (funn.vid()) {
            func.submit_buy()
        }
    }),
    //
    share: () => {
        console.log('SHARE')
    }
}

const price = computed((): number => product_tool.getprice(prp.v))
</script>