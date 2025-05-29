<template>
    <view>
        <view class="pt-row">
            <VwUcpNumberMsg/>

            <view class="py-row"></view>

            <view class="px-row pt-x1">
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
            </view>

            <view class="pt-x2">
                        
                <view class="pt-s bg-con">
                    <view class="fx-i zi-s">
                        <CoHeaderTabItem class="w-333" 
                            @tap="aii.iive = i" :iive="aii.iive == i" :tit="v.tit"
                            v-for="(v, i) in tabs" :key="i">
                        </CoHeaderTabItem>
                    </view>
                    <view class="zi-t bd-b w-100 bd-c-s"></view>
                </view>
                <view>
                    <view class="bg-pag-pri" v-if="aii.iive == 0">
                        <CoEmpty/>
                        <CkSpace :h="5"/>
                    </view>
                    <view v-if="aii.iive == 1">
                        <VwUcpGallery/>
                        <CkSpace :h="5"/>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import VwUcpNumberMsg from './center/VwUcpNumberMsg.vue';
import { authDispatch, authGetters } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import VwUcpGallery from './center/VwUcpGallery.vue';
import CoHeaderTabItem from '@/components/element/tabs/CoHeaderTabItem.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import appRouter from '@/tool/uni/app-router';

const aii = reactive({
    iive: 0,

})

const is_publisher = computed(() => authGetters.is_publisher)

const tabs = computed((): MANY => {
    return [
        { tit: '我的参与', v: 0 },
        { tit: '个人相册', v: 1 },
    ]
})

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
    locard: () => {

    },
    logout: () => {
        authDispatch('logout');
        uniRouter.launchpg('login')
    },
    love: () => {
        appRouter.manager_love()
    },
    pays: () => {
        appRouter.manger_pays()
    }
}
</script>
            <!--
            <view v-if="is_publisher">
                <view class="px-row pt">
                    操作栏
                </view>
                <view class="px-row py-x1">
                    <CoMoUserOptionGo :i="'images'" :tit="'个人相册'"/>
                    <view class="pt"></view>
                    <CoMoUserOptionGo :i="'addr'" :tit="'活动打卡'"/>
                    <view class="pt"></view>
                    <CoMoUserOptionGo @tap="funn.logout" :i="'i'" :tit="'退出登录'"/>
                </view>
            </view>-->

            <!--
            <view class="pb-row pt-x2">
                <view>
                    <CoMoUserAdvSwipper/>
                </view>
            </view>
            -->
            <!--
            <view class="py-row px-row">
                <view>
                    <view>
                        <VwUcpMyLove/>
                    </view>
                </view>
            </view>
            -->
            <!--
            <view class="pt-col pb"></view>
            <view>
                <VwUcpMyLove/>
            </view>
            -->

            <!--
            <view class="fx-s">
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
            </view>-->