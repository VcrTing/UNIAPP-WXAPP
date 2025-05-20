<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">修改个人资料</view></template>
        </CoAppTopBackBar>
        <view>
            <UserBaseInfoForm/>
            <view class="pt-row"></view>
            <UserUsllyForm/>
        </view>
        <!--
        <CoAppBomCarBar>
            <view class="px-row pt-s">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>-->
        <view class="abs-i b-0 px-row pb-x3" @tap="uniRouter.back">
            <OFI clazz="bg-con w-2em h-2em h5" :i="'i'"/>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButtonI from '@/cake/button/i/OButtonI.vue';
import OFI from '@/cake/button/i/OFI.vue';
import CoAppBomCarBar from '@/components/app/bar/bom/CoAppBomCarBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import UserBaseInfoForm from '@/view/user/info/UserBaseInfoForm.vue';
import UserUsllyForm from '@/view/user/info/UserUsllyForm.vue';
import { ref } from 'vue';

const top = ref()
const addr = ref()
const money = ref()

const funn = {
    submit: () => {
        
        // uniRouter.navigatorpg('publish')
    }
}
</script>

<style lang="sass" scoped>
@use '../../../ui/sass/theme/primary' as *
page, uni-page-body
	background: $pri-pag-bg
</style>