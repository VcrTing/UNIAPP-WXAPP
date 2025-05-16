<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">搜索喜好</view></template>
        </CoAppTopBackBar>
        <view>
            <view class="mh-16em px-row">
                <VwIndexSearchInp/>
            </view>
            <view class="mh-8em px-row">
                
            </view>
            <view class="mh-16em">
                <VwIndexSearchRecommend/>
            </view>
        </view>
        
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwIndexSearchInp from '@/view/index/search/VwIndexSearchInp.vue';
import VwIndexSearchRecommend from '@/view/index/search/VwIndexSearchRecommend.vue';
import { ref } from 'vue';

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