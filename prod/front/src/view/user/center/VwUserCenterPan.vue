<template>
    <view>
        <view class="softer">
            <VwUcpBasicUserMsg/>
            <view v-if="aii.init" class="" :class="isphone ? 'bg-con' : ''">
                <view class="py-row"></view>
                <!-- -->
                <view class="px-row pt-x1 softer mxw-pc"><CoMoUcpGoBtns :isphone="isphone"/></view>
                <!-- -->
                <view class="softer o-h mxw-pc">
                    <view class="pt-x2 pb"></view>
                    <CoMoUserAdvSwipper v-if="isphone" :info="info" :clazz="isphone ? '' : 'br'"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive } from 'vue';
import VwUcpBasicUserMsg from './center/VwUcpBasicUserMsg.vue';
import CoMoUcpGoBtns from './component/CoMoUcpGoBtns.vue';
import CoMoUserAdvSwipper from '@/components/modules/user/CoMoUserAdvSwipper.vue';
import { appState, uiGetters } from '@/memory/global';
import { timeout } from '@/tool/util/future';
//
const aii = reactive({ iive: 0, init: false })
nextTick(() => timeout(() => aii.init = true, 200))
//
const isphone = computed((): boolean => uiGetters.isphone)
const info = computed((): AppInfo => appState.info) 
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