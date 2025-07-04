<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">新增邀请</view></template>
        </CoAppTopBackBar>
        <view class="px-row">
            <VwInteractPlusTarget/>
            <view class="py-s"></view>
            <VwInteractPlusContent/>
            <view class="py-s"></view>
            <VwInteractPlusForm/>
            <view class="py-row"></view>
            <view class="pt-row">
                <OButton clazz="btn-app">提交</OButton>
            </view>
        </view>
        <!--
        <CoAppBomCarBar>
            <view class="px-row pt-s">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>
        -->
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwInteractPlusContent from '@/view/interact/plus/VwInteractPlusContent.vue';
import VwInteractPlusForm from '@/view/interact/plus/VwInteractPlusForm.vue';
import VwInteractPlusTarget from '@/view/interact/plus/VwInteractPlusTarget.vue';
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

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>