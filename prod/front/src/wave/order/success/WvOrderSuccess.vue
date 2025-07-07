<template>
    <view>
        <view class="">
            <view class="fx-c h-24vh">
                <view class="ta-c">
                    <view class="fx-c">
                        <view class="btn-succ w-5em h-5em br-cir fx-c"><UiI clazz="h3" i="check"/></view>
                    </view>
                    <view class="ta-c py-x1">
                        <view class="succ h4"><text>下单成功</text></view>
                    </view>
                </view>
            </view>
            <view class="py-x1 ta-c">
                <view >
                    <view class="fx-c py px-row fx-aii-btn-def h7">
                        <view>订单号：</view>
                        <view><text class="us-a fw-550">{{ xorder.documentId }}</text></view>
                    </view> 
                </view>
                <view class="fs-s tid py px-row fx-aii-btn-def">
                    <view>请加一下客服为好友，把订单号告诉客服，客服会给您解锁订单，</view>
                    <view>谢谢您的理解。</view>
                </view>
            </view>
            <view>
                <OScrollX>
                    <view class="mw-100 " :class="(contacts.length > 1) ? 'row' : 'fx-c'">
                        <view v-for="(v, i) in contacts" class="py ta-c d-ib px-s">
                            <view class="btn-def-s br o-h">
                                <CoMoOrderContact :v="v"/>
                            </view>
                        </view>
                    </view>
                </OScrollX>
            </view>
            <view class="py-x2">
                <view class="btn-err w-100 py-s px-row ta-c fs-w">
                    <text>温馨提示：</text>
                    <text>您的订单还有<text>{{ DEV_ORDER.PAY.WAITING_MINUTE }}</text>分钟就结束，请尽快加客服为好友哦。</text>
                </view>
            </view>
        </view>
        <view class="abs-b i-0 fx-c w-100 bg-con">
            <view class="w-618">
                <view class="pb-x3 pt">
                    <OButton color="def" clazz="btn-app" @tap="funn.home">返回首页</OButton>
                    <view class="py-n"></view>
                    <OButton clazz="btn-app" @tap="appRouter.order_my_working()">查看我的订单</OButton>
                </view>
                <OSafeAreaBottom/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { CONTACT_DEF } from '@/conf/conf-app';
import { appState, orderState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import { is_nice_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';
import CoMoOrderContact from '../__component/contact/CoMoOrderContact.vue';
import { DEV_ORDER } from '@/conf/conf-dev';
import { promise } from '@/tool/util/future';
import { pageIndexDispatch } from '@/memory/page';

const xorder = computed((): XOrder => orderState.order_of_succ)
const contacts = computed((): User[] => {
    const src: User[] = info.value.contacts || []
    if (is_nice_arr(src)) return src
    return [ CONTACT_DEF ]
})
const info = computed((): AppInfo => must_one(appState.info))

const funn = {
    home: () => {
        appRouter.index()
    },
    init: () => promise(() => {
        const i = xorder.value.documentId || null
        if (!i) {
            appRouter.index()
            pageIndexDispatch('refresh')
        }
    })
}
</script>