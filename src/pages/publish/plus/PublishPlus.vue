<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri pb-s'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">新增活动</view></template>
        </CoAppTopBackBar>
        <view class="pt-row">
            <VwPubPlusTopForm ref="top"/>
            <view class="py-s"></view>
            <VwPubPlusAddrForm ref="addr"/>
            <view class="py-s"></view>
            <!--
            <VwPubPlusMoneyForm ref="money"/>
            <view class="py-s"></view>
            -->
            
            <view class="">
                <CoMoSecurityAgreeLine :aii="aii">
                    <text class="tit">已同意并阅读</text>
                    <text class="pri" @tap="funn.look(1)">《{{ APP_GENERATE_DETAIL.name }}服务协议》</text>
                    <text class="pri" @tap="funn.look(0)">《隐私政策》</text>
                </CoMoSecurityAgreeLine>
            </view>
            <CkSpace :h="12"/>
        </view>
        <CoAppBomCarBar :clazz="'bg-pag-pri'">
            <view class="px-row pt-x1 pb">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>
    </PageLayout>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomCarBar from '@/components/app/bar/bom/CoAppBomCarBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoMoSecurityAgreeLine from '@/components/modules/security/CoMoSecurityAgreeLine.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import VwPubPlusAddrForm from '@/view/publish/plus/VwPubPlusAddrForm.vue';
import VwPubPlusMoneyForm from '@/view/publish/plus/VwPubPlusMoneyForm.vue';
import VwPubPlusTopForm from '@/view/publish/plus/VwPubPlusTopForm.vue';
import { reactive, ref } from 'vue';
const top = ref()
const addr = ref()
const money = ref()

const aii = reactive({
    agree: false
})

const funn = {
    look: (v: number) => {

    },
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