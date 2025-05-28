<template>
    <view>
        <view class="pt-row">
            <VwUcpNumberMsg/>

            <view class="py-row"></view>
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
                    <CoMoUserOptionBtn :i="'user-add'" :tit="'我的邀请'"  @tap="funn.history"/>
                    <CoMoUserOptionBtn :i="'bank-card'" :tit="'支付记录'"  @tap="funn.history"/>
                    <CoMoUserOptionBtn :i="'grid'" :tit="'历史活动'"  @tap="funn.togallery"/>
                </view>
            </view>

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
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoMoUserOptionGo from '@/components/modules/user/CoMoUserOptionGo.vue';
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import VwUcpRecommend from './center/VwUcpRecommend.vue';
import VwUcpMyLove from './center/VwUcpMyLove.vue';
import CoMoUserAdvSwipper from '@/components/modules/user/CoMoUserAdvSwipper.vue';
import { storage } from '@/tool/web/storage';
import VwUcpGallery from './center/VwUcpGallery.vue';
import CoHeaderTabItem from '@/components/element/tabs/CoHeaderTabItem.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CkSpace from '@/cake/content/CkSpace.vue';

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
        storage.set('PAGE_ORDER_KEY', 0)
        uniRouter.gopg('order')
    },
    working: () => {
        storage.set('PAGE_ORDER_KEY', 1)
        uniRouter.gopg('order')
    },
    history: () => {
        storage.set('PAGE_ORDER_KEY', 2)
        uniRouter.gopg('order')
    },
    togallery: () => {
        // uniRouter.gopg('user_gallery')
    },
    locard: () => {

    },
    logout: () => {
        authDispatch('logout');
        uniRouter.launchpg('login')
    }
}
</script>


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