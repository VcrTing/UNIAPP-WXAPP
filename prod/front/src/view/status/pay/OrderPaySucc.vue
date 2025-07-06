<template>
    <view>
        <view class="">
            <view class="fx-c h-24vh">
                <view class="ta-c">
                    <view class="btn-succ w-5em h-5em br-cir fx-c"><UiI clazz="h3" i="check"/></view>
                    <view class="ta-c py-x1">
                        <view class="succ h4"><text>下单成功</text></view>
                    </view>
                </view>
            </view>
            <view class="py-x1 ta-c">
                <view >
                    <view class="fx-c py-s px-row fx-aii-btn-def">
                        <view>您的订单号：</view>
                        <view><text class="us-a">{{ xorder.documentId }}</text></view>
                    </view> 
                </view>
                <view class="h8 py px-row fx-aii-btn-def">请加一下客服为好友，为您服务，谢谢。</view>
            </view>
            <view>
                <OScrollX>
                    <view v-for="(v, i) in contacts" class="py ta-c d-ib">
                        <view class="py px-row btn-def-s br">
                            <view class="py-s">
                                <CkAvatar clazz="w-5em h-5em br" :src="v.avatarUrl" :id="''" :not_mainpage="true"/>
                            </view>
                            <view>
                                <view class="fx-c px-s py-s fx-aii-btn-def">
                                    <text class="pr-s">{{ v.nickName }}</text>
                                    <CkSex :sex="v.gender"/>
                                    <CkAge :v="v.age"/>
                                </view>
                            </view>
                            <view>
                                <view class="fx-c px-s py-s">
                                    <OButtonTag clazz="fx-c br px-s py-t">
                                        <CoImg clazz="w-2em h-2em fs-s br-cir" :src="DATA_WX_COVER.url"/>
                                        <view>
                                            <text class="px-s">请加微信：</text>
                                            <text class="us-a">{{ v.socialAccount }}</text>
                                        </view>
                                    </OButtonTag>
                                </view>
                                <view class="fx-c px-s py-s fx-aii-btn-def">
                                    <view class="fx-c"></view>
                                </view>
                            </view>
                        </view>
                        
                    </view>
                </OScrollX>
            </view>
            <view>
                <view class="btn-err w-100 py-s px-row ta-c">
                    <text>温馨提示：</text>
                    <text>您的订单还有5分钟就结束，请尽快加客服为好友哦。</text>
                </view>
            </view>
        </view>
        <view class="abs-b i-0 fx-c w-100">
            <view class="w-618">
                <view class="py-x3">
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
import OButtonTag from '@/cake/button/OButtonTag.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAge from '@/cake/visual/ider/CkAge.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { CONTACT_DEF } from '@/conf/conf-app';
import { DATA_WX_COVER } from '@/conf/conf-datas';
import { appState, orderState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import { is_nice_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

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
    }
}
</script>