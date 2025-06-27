<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        
        
        <OAppTopBar :mat="true" :not_in_safearea="true">
            <view class="ps-r zi-t">
                <view class="abs-b i-0 w-100 h-100">
                    <VwIndexBanner/>
                </view>
                <OSafeAreaTop/>
                <view class="fx-s w-100 pi-row ps-r zi-s">
                    <view class="abs-i middie zi-n">
                        <view @tap="uniRouter.back" class="pi-row">
                            <view class="btn-wht-s px-row w-2em h-2em br-cir fx-c c-p"><UiI i="i"/> </view>
                        </view>
                    </view>
                    <view class="w-80 pi-x3 py-s">
                        <view class="fx-i pi w-100">
                            <input @blur="funn.submit" class="fx-1 px mh-btn br-s btn-wht-s" v-model="aii.search" placeholder="请输入您的喜好"/>
                            <view class="px" @tap="funn.submit">
                                <OButton :weak="true" color="wht" clazz="px-col py-col br-s">搜索</OButton>
                            </view>
                        </view>
                    </view>
                    <view class="fx-1"></view>
                </view>
            </view>
        </OAppTopBar>

        <view class="py-row">
            <OScrollY :styie="{
                height: 'calc(100vh - 4em)'
            }">
                <view>
                    <CoViDataLoading :ioading="aii.ioading" :items="result.activities">
                        <VwIndexSearchPag :activities="result.activities"/>
                    </CoViDataLoading> 
                </view>
            </OScrollY>
        </view>
        <CoBomBackBtn :clazz="'btn-wht-s'" @tap="uniRouter.back"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OButton from '@/cake/button/OButton.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { uiState } from '@/memory/global';
import server_search from '@/server/common/server_search';
import net_tool from '@/tool/http/net_tool';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import VwIndexSearchPag from '@/view/index/search/VwIndexSearchPag.vue';
import VwIndexBanner from '@/view/index/VwIndexBanner.vue';
import { reactive, ref } from 'vue';

const aii = reactive({
    prev: '', search: '', ioading: false, pager: net_tool.__pager()
})
const result = reactive({
    activities: <Activity[]> [ ],
    previes: <Activity[]> [ ]
})

const funn = {
    fetching: () => futuring(aii, async () => {
        aii.prev = aii.search
        const ats: Activity[] = await server_search.search(aii.search, { }, aii.pager)
        console.log('搜索到的结果 =', ats)
        if (is_nice_arr(ats)) {
            result.activities = ats
        }
    }),
    submit: () => {
        if (aii.search) {
            aii.search = aii.search.trim()
            if (aii.search !== aii.prev) {
                funn.fetching()
            }
            else {
                console.log('搜索文字，没变化')
            }
        }
        else {
            if (aii.prev) {
                console.log('清空输入框。')
            }
            else {
                console.log('啥都不搜。')
            }
        }
        // uniRouter.navigatorpg('publish')
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

            <!--
            <view class="mh-16em px-row">
                <VwIndexSearchInp/>
            </view>
            <view class="mh-8em px-row">
                
            </view>
            <view class="mh-16em">
                <VwIndexSearchRecommend/>
            </view>
            -->