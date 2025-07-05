<template>
    <view>
        <view class="h-60vh fx-c">
            <view class="ta-c">
                <view class="btn-succ w-5em h-5em br-cir fx-c"><UiI clazz="h3" i="check"/></view>
                <view class="ta-c py-x1">
                    <view class="succ h4"><text>支付成功</text></view>
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
import appRouter from '@/tool/uni/app-router';
import UiI from '@/ui/element/i/UiI.vue';

// const prp = defineProps<{}>()
const funn = {
    home: () => {
        appRouter.index()
    }
}
</script>