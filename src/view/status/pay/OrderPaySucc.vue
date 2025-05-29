<template>
    <view>
        <view class="card pa-card fx-c mh-10em">
            <view class="">
                <view class="h5 sus">支付成功</view>
            </view>
        </view>
        <view class="abs-b i-0 w-100 px-row">
            <view class="py-x3">
                <OButtonWht clazz="btn-app" @tap="funn.home">返回首页</OButtonWht>
                <view class="py-n"></view>
                <OButton clazz="btn-app">查看活动</OButton>
            </view>
            <OSafeAreaBottom/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import appRouter from '@/tool/uni/app-router';

// const prp = defineProps<{}>()
const funn = {
    home: () => {
        appRouter.index()
    }
}
</script>