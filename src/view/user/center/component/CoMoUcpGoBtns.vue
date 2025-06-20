<template>
    
    <view class="br bg-def-s fx-s">
        <view class="ps-r zi-t">
            <CoMoUserOptionBtn :i="'doing'" :tit="'我的参与'"  @tap="funn.working"/>
            <view class="abs-r t-0 pr-s pt" v-if="len > 0">
                <view class="dot-err">
                    <text class="fs-s w-1em h-1em fx-c">{{ len }}</text>
                </view>
            </view>
        </view>
        <CoMoUserOptionBtn :i="'grid'" :tit="'参与历史'"  @tap="funn.history"/>
        <CoMoUserOptionBtn :i="'love'" :tit="'我的关注'"  @tap="funn.love"/>
        <CoMoUserOptionBtn :i="'bank-card'" :tit="'交易记录'"  @tap="funn.pays"/>
    </view>
</template>

<script setup lang="ts">
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import { orderState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const joins = computed((): ActivityJoin[] => orderState.join_of_mine)
const len = computed((): number => must_arr(joins.value).length)

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