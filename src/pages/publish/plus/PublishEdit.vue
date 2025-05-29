<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'pb-s bg-pag-pri'" @back="uniRouter.back" :mat="true">
            <template #tit><view class="header ta-c">修改活动</view></template>
        </CoAppTopBackBar>
        <view>
            <view><VwPubEditTopForm/></view>
            <view class="py-s"></view>
            <view><VwPubEditCateForm/></view>
            <view class="py-s"></view>
            <view><VwPubEditJoiner /></view>
            <view class="py-s"></view>
            <view><VwPubEditGallery /></view>
            <view class="py-s"></view>
            <view><VwPubEditStatus /></view>

            <CkSpace :h="8"/>
            <CoAppBomFuncBar :clazz="'bg-pag-pri'">
                <view class="py px-row">
                    <!--
                    <CoBomBtnGroup @submit="funn.submit" @cancle="funn.cancle"/>
                    -->
                    <OButton clazz=""><view class="py-t">提交</view></OButton>
                </view>
            </CoAppBomFuncBar>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomFuncBar from '@/components/app/bar/bom/CoAppBomFuncBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwPubEditCateForm from '@/view/publish/edit/VwPubEditCateForm.vue';
import VwPubEditGallery from '@/view/publish/edit/VwPubEditGallery.vue';
import VwPubEditJoiner from '@/view/publish/edit/VwPubEditJoiner.vue';
import VwPubEditStatus from '@/view/publish/edit/VwPubEditStatus.vue';
import VwPubEditTopForm from '@/view/publish/edit/VwPubEditTopForm.vue';
import { reactive, ref } from 'vue';

const aii = reactive({
    agree: false
})

const funn = {
    look: (v: number) => {

    },
    submit: () => {
        // uniRouter.navigatorpg('publish')
    },
    cancle: () => {
        uniRouter.back()
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>