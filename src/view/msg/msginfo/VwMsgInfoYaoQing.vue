<template>
    <view>
        <view class="fx-i">
            <OButtonDef :weak="true" class="px-row py-s tiw">未读</OButtonDef>
            <OButtonDef :weak="true" class="px-row py-s sus">已读</OButtonDef>
        </view>
        <OScrollY :styie="{
            height: 'calc(100vh - 22em)'
        }">
            <view class="px-row py-row">
                <view class="fx-s py fx-t">
                    <view class="pr">
                        <view>
                            <CkAvatar clazz="w-3em h-3em h9" :src="funn.meizi(0).avatar"/>
                        </view>
                    </view>
                    <view class="fx-1">
                        <view class="card px-col">
                            <view class="pt-s pb-x1">
                                <text>xxx邀请你参加活动</text>
                            </view>
                            <view class="fx-i fx-t fx-aii-btn-def br-s">
                                <view class="w-5em h-7vh">
                                    <CoImg clazz="h-100 br-s" :src="v.banner"/>
                                </view>
                                <view class="pi pr-s">
                                    <view class="pt h7">{{ v.title }}</view>
                                    <view class="pt-s">
                                        <view class="fs-s fx-i tis">
                                            <UiI i="addr"/>
                                            <view>
                                                <text>13.0km</text>
                                                <text>龙华大浪浪静路蓝天公寓</text>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="pt pb-s">
                                <view class="fx-s">
                                    <view>
                                        <view class="money">
                                            <text>￥</text>
                                            <text class="fw-550 ">300.00</text>
                                            <text class="fs-n px-s">打赏金额</text>
                                        </view>
                                    </view>
                                    <view class="fx-1 fx-r">
                                        <OButtonDef :weak="true" clazz="fs-s px h-2em br-rnd fx-c">
                                            <UiI clazz="sus" i="trash"/>
                                        </OButtonDef>
                                        <view class="px-s"></view>
                                        <OButton :weak="true" clazz="fs-s px h-2em br-rnd">同意</OButton>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </OScrollY>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';
import UiI from '@/ui/element/i/UiI.vue';

// const prp = defineProps<{}>()

const v = mock_orders.items[1]

const funn = {
    meizi: (n: number) => {
        return mock_meizi.items[n]
    }
}
</script>