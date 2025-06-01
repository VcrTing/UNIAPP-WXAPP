<template>
    <view>
        
        <view>
        <view class="px-row br pt-row">
            <!-- -->
            <view v-for="(v, i) in datas" :key="i"
                class="br pb-x1"
            >
                <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br py-col">
            <view class="py-col px-col">
                <view class="fw-600 h5 hih tils-x1">{{ v.title }}</view>
            </view>
            <view class="pt-s px-col">
                <view class="fx-i">
                    <CkAvatar clazz="w-2em h-2em fs-w" :src="v.publisher.avatar"/>
                    <view class="pi-s">
                        <view class="d-ib">{{ v.publisher.name }}</view>
                        <view class="d-ib pi-t">
                            <CkSex :sex="v.publisher.sex"/>
                        </view>
                        <view class="d-ib pri pi-row fs-w">
                            <text class="pr">#&nbsp;十单十成</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="py-row px-col">
                <view class="pt-s">
                    <OButton clazz="d-ib fs-s" :weak="true">已报名</OButton>
                    <view class="d-ib px-s fs-n">
                        周五 05.23 20:30 |
                    </view>
                    <view class="d-ib">
                        20.6km 深圳湾体育中心
                    </view>
                </view>
            </view>
            <view>
                <view class="o-h fx-s" v-if="v.gallery ">
                    <view class="w-33" v-for="(m, n) in v.gallery" :key="n">
                        <image class="w-100 h-14vh" mode="aspectFill" :src="m.src"/>
                    </view>
                </view>
                <view class="o-h" v-else>
                    <view >
                        <image class="w-100 h-14vh" mode="aspectFill" :src="v.banner"/>
                    </view>
                </view>
            </view>
            <view class="pt-s px-col">
                <view class="fx-s">
                    <view class="fx-i fx-1 money fw-700">
                        <text class="h5">3.00&nbsp;&nbsp;</text>
                        <text>元 报名费</text>
                    </view>
                    <view>
                        <OButtonOut @tap="funn.detail(v)" :clazz="'fw-550 mw-5em mh-btn'">详情</OButtonOut>
                    </view>
                </view>
            </view>
        </view>
    </view>
            </view>

        </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import { orderDispatch } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';
import uniRouter from '@/tool/uni/uni-router';
import { computed } from 'vue';

const datas = computed((): MANY => {
    const src = mock_orders.items || [ ]
    if (src && src.length) {
        return [ src[1] ]
    }
    return src;
})

const meizi = mock_meizi.items

const funn = {
    detail: (v: ONE) => {
        uniRouter.gopg('order_working')
    }
}
</script>