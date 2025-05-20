<template>
    <view>
        <view class="py-row">
            <VwUcpNumberMsg/>

            <view class="py-row"></view>
            <view class="px-row pt">
                操作栏
            </view>
            <view class="px-row py-x1">
                <CoMoUserOptionGo :i="'images'" :tit="'个人相册'"/>
                <view class="pt"></view>
                <CoMoUserOptionGo :i="'addr'" :tit="'活动打卡'"/>
                <!--
                <view class="pt"></view>
                <CoMoUserOptionGo :i="'images'" :tit="'退出登录'"/>
                -->
            </view>
            <!--
            <view class="fx-r px-row pt-x1">
                <CoMoUserOptionBtn :i="'images'" :tit="'个人相册'"  @tap="funn.gallery"/>
                <CoMoUserOptionBtn :i="'addr'" :tit="'打卡'"  @tap="funn.locard"/>
                <CoMoUserOptionBtn :i="'r'" :tit="'退出登录'"  @tap="funn.logout"/>
            </view>
            <view class="pt-col pb"></view>
            <view v-if="!is_publisher">
                <VwUcpRecommend/>
            </view>
            <view v-else>
                <VwUcpMyLove/>
            </view>-->
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

const aii = reactive({

})

const is_publisher = computed(() => authGetters.is_publisher)

const funn = {
    gallery: () => {
        uniRouter.gopg('user_gallery')
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