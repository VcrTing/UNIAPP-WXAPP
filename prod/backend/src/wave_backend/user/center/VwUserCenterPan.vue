<template>
    <view>
        <view class="softer">
            <VwUcpNumberMsg/>
            <view class="py-row"></view>
            <!-- 
            <view class="px-row pt-x1 softer mxw-pc"><CoMoUcpGoBtns/></view>
            -->
            <!-- 
            <view class="pt-x2 softer">
                <view class="py"></view>
                <CoMoUserAdvSwipper/>
            </view>
            -->
            <view>
                <CkSpace :h="3"/>
                <view class="">
                    <view class="fx-s">
                        <view @tap="funn.front" class="fx-i btn-wht-s py px-row w-50">
                            <UiI i="i"/>
                            <view class="px-s">进入主站</view>
                        </view>
                        <view @tap="funn.strapi" class="fx-r btn-wht-s py px-row w-50">
                            <view class="px-s">进入后台</view>
                            <UiI i="r"/>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import VwUcpNumberMsg from './center/VwUcpNumberMsg.vue';
import CoMoUcpGoBtns from './component/CoMoUcpGoBtns.vue';
import CoMoUserAdvSwipper from '@/components/modules/user/CoMoUserAdvSwipper.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import { uiGetters, uiState } from '@/memory/global';
import { WEB_FRONT, WEB_STRAPI } from '@/conf/conf';
import UiI from '@/ui/element/i/UiI.vue';

const aii = reactive({
    iive: 0,
})

const tabs = computed((): MANY => {
    return [
        { tit: '我的参与', v: 0 },
        { tit: '个人相册', v: 1 },
    ]
})

const ismall = computed((): boolean => uiGetters.ismall)

const funn = {
    front: () => {
        if (ismall.value) {

        }
        else {
            window.location.href = WEB_FRONT
        }
    },
    strapi: () => {
        if (ismall.value) {

        }
        else {
            window.location.href = WEB_STRAPI
        }
    }
}
</script>

                <!--
                <view class="pt-s bg-con-fer-s bf">
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
                        <VwUcpPubMineActivity/>
                        <CkSpace :h="5"/>
                    </view>
                    <view v-if="aii.iive == 1">
                        <VwUcpGallery/>
                        <CkSpace :h="5"/>
                    </view>
                </view>
                -->
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