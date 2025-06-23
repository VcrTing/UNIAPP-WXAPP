<template>
    <view>
        <view class="softer">
            <VwUcpNumberMsg/>
            <view class="py-row"></view>
            <!-- -->
            <view class="px-row pt-x1 softer"><CoMoUcpGoBtns/></view>
            <!-- -->
            <view class="pt-x2 softer">
                <view class="py"></view>
                <CoMoUserAdvSwipper/>
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
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import VwUcpNumberMsg from './center/VwUcpNumberMsg.vue';
import CoMoUcpGoBtns from './component/CoMoUcpGoBtns.vue';
import CoMoUserAdvSwipper from '@/components/modules/user/CoMoUserAdvSwipper.vue';

const aii = reactive({
    iive: 0,

})

const tabs = computed((): MANY => {
    return [
        { tit: '我的参与', v: 0 },
        { tit: '个人相册', v: 1 },
    ]
})

const funn = {
    
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