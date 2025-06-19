<template>
    <view>
        <view class="fx-s fx-t">
            <CkAvatar clazz="w-3em h-3em" :id="pusher.id" :src="pusher.avatarUrl"/>
            <view class="fx-1 pi-row">
                <view class="bg-con br px-row py-row">
                    <view class="fx-s">
                        <view class="h7 fw-550">{{ one.title }}</view>
                        <view class="pi">
                            <view :class="'fs-s br-s px-t pri'" :weak="true">待开始</view>
                        </view>
                    </view>
                    <view class="pt">
                        <view class="fx-i">
                            <view>
                                <image class="w-8em h-4em br-it-s br-ib-s" mode="aspectFill" :src="one.banner"/>
                            </view>
                            <view class="">
                                <image class="w-6em h-4em br-rt-s br-rb-s" mode="aspectFill" :src="mock_orders.mapimg"/>
                            </view>
                        </view>
                    </view>
                    <view class="fx-s fx-b">
                        <view class="fs-n fx-r tid"><UiI class="fs-s" :i="'time'"/>&nbsp;&nbsp;{{ one.timed.startText }}</view>
                        <view class="fx-r">
                            <!--<OButtonDef :weak="true" clazz="br"><UiI class="h5" :i="'x'"/></OButtonDef>-->
                            <view class="px-s"></view>
                            <OButton @tap="funn.detail" clazz="fs-s">查看详情</OButton>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import uniRouter from '@/tool/uni/uni-router';
import { must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: ONE
}>()

const one = computed((): ONE => must_one(prp.v.one))
const pusher = computed((): ONE => must_one(one.value.publisher))

const funn = {
    detail: () => {
        uniRouter.gopg('order_working')
    }
}
</script>