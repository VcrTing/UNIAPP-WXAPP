<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con pb-s'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">标签管理</view></template>
        </CoAppTopBackBar>
        <view>
            <VwUserManagerTags/>
            <view class="mh-8em"></view>
        </view>
        <CoBomBackBtn/>
    </PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwUserManagerTags from '@/view/user/manager/tags/VwUserManagerTags.vue';
import { ref } from 'vue';

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