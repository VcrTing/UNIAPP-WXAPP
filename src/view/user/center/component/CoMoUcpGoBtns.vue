<template>
    
    <view class="br bg-def-s fx-s">
        <view class="ps-r zi-t">
            <CoMoUserOptionBtn :i="'doing'" :tit="'进行中'"  @tap="funn.working"/>
            <view class="abs-r t-0 pr-s pt">
                <view class="dot-err">
                    <text class="fs-s w-1em h-1em fx-c">1</text>
                </view>
            </view>
        </view>
        <CoMoUserOptionBtn :i="'grid'" :tit="'历史活动'"  @tap="funn.history"/>
        <CoMoUserOptionBtn :i="'love'" :tit="'我的收藏'"  @tap="funn.love"/>
        <CoMoUserOptionBtn :i="'bank-card'" :tit="'金额记录'"  @tap="funn.pays"/>
    </view>
</template>

<script setup lang="ts">
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import appRouter from '@/tool/uni/app-router';

// const prp = defineProps<{}>()

const funn = {
    
    aiijoin: () => {
        appRouter.order_my_join()
    },
    working: () => {
        appRouter.order_my_working()
    },
    history: () => {
        appRouter.order_my_history()
    },
    togallery: () => {
        // uniRouter.gopg('user_gallery')
    },
    love: () => {
        appRouter.manager_love()
    },
    pays: () => {
        appRouter.manger_pays()
    }
}
</script>