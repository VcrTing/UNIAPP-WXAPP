<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBar :clazz="'bg-con'" :mat="true">
            <view class="ps-r zi-t fx-s">
                <view class="abs-i middie zi-n">
                    <view @tap="funn.submit" class="fx-aii-btn-def px-row w-3em h-3em br-cir fx-c"><UiI i="search"/> </view>
                </view>
                <view class="fx-c w-100 px-x2">
                    <input @blur="funn.submit" class="w-100 inp-app" v-model="aii.search" placeholder="请输入您的喜好"/>
                </view>
            </view>
        </CoAppTopBar>
        <view class="py-row">
            <OScrollY :styie="{
                height: 'calc(100vh - 12em)'
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
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import server_search from '@/server/activity/server_search';
import net_tool from '@/tool/http/net_tool';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import VwIndexSearchPag from '@/view/index/search/VwIndexSearchPag.vue';
import { reactive, ref } from 'vue';

const aii = reactive({
    prev: '', search: '', ioading: false, pager: net_tool.generate_pagination()
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