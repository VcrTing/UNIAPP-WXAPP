<template>
    <view>
        <view class="pb-x1 pt-x1">
            <view class="fx-s">
                <view class="w-30 fx-c">
                    <CoMoMsgMainItem :tit="'活动消息'" @tap="appRouter.msg_activity">
                        <OButtonIht :clazz="'w-3em h-3em h7'"><UiI clazz="h5" :i="'user'"/></OButtonIht>
                    </CoMoMsgMainItem>
                </view>
                <view class="w-30 fx-c">
                    <CoMoMsgMainItem :num="1" :tit="'邀请我'" @tap="appRouter.msg_yaoqing">
                        <OButtonIht :clazz="'w-3em h-3em h7'"><UiI clazz="h5" :i="'user'"/></OButtonIht>
                    </CoMoMsgMainItem>
                </view>
                <view class="w-30 fx-c">
                    <CoMoMsgMainItem :tit="'系统公告'" @tap="appRouter.msg_gonggao">
                        <OButtonIht :clazz="'w-3em h-3em h7'"><UiI clazz="h5" :i="'user'"/></OButtonIht>
                    </CoMoMsgMainItem>
                </view>
            </view>
        </view>
        <view class="pt-row">
            <CkIconAndBomLineItem @tap="appRouter.msg_notify">
                <template #i>
                    <view class="pt-s pr">
                        <OButtonIht :clazz="'w-3em h-3em'"><UiI clazz="h6" :i="'user'"/></OButtonIht>
                    </view>
                </template>
                <template #con>
                    <CoMoMsgShowItem :tit="'系统消息'" :timed="'05-27'" :msg="'您提交的活动审核不通过，请重新修改'"/>
                </template>
            </CkIconAndBomLineItem>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkIconAndBomLineItem from '@/cake/content/item/CkIconAndBomLineItem.vue';
import UiI from '@/ui/element/i/UiI.vue';
import CoMoMsgShowItem from '../__component/CoMoMsgShowItem.vue';
import CoMoMsgMainItem from '../__component/CoMoMsgMainItem.vue';
import appRouter from '@/tool/uni/app-router';

const funn = {
    
}
</script>