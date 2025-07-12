<template>
    
    <view class="br  fx-s" :class="isphone ? 'bg-def' : 'bf'">
        <view class="ps-r zi-t" v-for="(v, i) in tabs" :key="i">
            <CoMoUserOptionBtn :i="v.i" :tit="v.name"  @tap="v.doing"
                :clazz="isphone ? 'fx-aii-btn-def' : 'fx-aii-btn-wht'"
            />
            <view class="abs-r t-0 pr-s pt" v-if="v.len() > 0">
                <view class="dot-err softer">
                    <text class="fs-s w-1em h-1em fx-c">{{ v.len() }}</text>
                </view>
            </view>
        </view>
    </view>
</template>
 
<script setup lang="ts">
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import { orderState } from '@/memory/global';
import auth_tool from '@/tool/modules/common/auth_tool';
import appRouter from '@/tool/uni/app-router';
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    isphone?: boolean
}>()

const joins = computed((): ActivityJoin[] => orderState.join_of_mine)
const len = computed((): number => must_arr(joins.value).length)
 
const tabs = [
    {
        name: '浏览历史', i: 'msg', 
        doing: () => { funn.visual() }, len: () => { return len.value || 0 }
    },
    {
        name: '历史订单', i: 'grid', 
        doing: () => { funn.working() }, len: () => { return 0 }
    },
    {
        name: '收藏本站', i: 'love', 
        doing: () => { funn.collection() }, len: () => { return 0 }
    },
    {
        name: '交易记录', i: 'bank-card', 
        doing: () => { funn.pays() }, len: () => { return 0 }
    }
]

const funn = {
    collection: () => {
        console.log('收藏本站。')
    },
    visual: () => {
        appRouter.order_visual()
    },

    aiijoin: () => {
        appRouter.order_my_join()
    },
    msg: () => {
        
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
    love: () => auth_tool.doac(async () => {
        appRouter.manager_love()
    }),
    pays: () => auth_tool.doac(async () => {
        appRouter.manger_pays()
    })
}
</script>

        <!--
        <CoMoUserOptionBtn :i="'grid'" :tit="'参与历史'"  @tap="funn.history"/>
        <CoMoUserOptionBtn :i="'love'" :tit="'我的关注'"  @tap="funn.love"/>
        <CoMoUserOptionBtn :i="'bank-card'" :tit="'交易记录'"  @tap="funn.pays"/>
        -->