<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="h5 ta-c">新增活动</view></template>
        </CoAppTopBackBar>
        <view class="px-row">
            填写基本资料
            <VwPubPlusTopForm ref="top"/>
            
            <view>确定时间地点</view>
            <view>上传 Banner</view>
            <view>新增套餐描述</view>
        </view>
        <CoAppBomCarBar>
            <view class="px-row pt-s">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoAppBomCarBar from '@/components/app/bar/bom/CoAppBomCarBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwPubPlusTopForm from '@/view/publish/plus/VwPubPlusTopForm.vue';
import { ref } from 'vue';

const top = ref()

const funn = {
    submit: () => {
        
        // uniRouter.navigatorpg('publish')
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary' as *
page, uni-page-body
	background: $pri-pag-bg
</style>