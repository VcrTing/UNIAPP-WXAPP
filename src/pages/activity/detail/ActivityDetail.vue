<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :h="68">
            <template #bg>
                <VwActivityDetailBanner :one="view" :h="'32.2vh'"/>
            </template>
            <template #top>
                <CoAppTopBackBar @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
            </template>
            <template #con>
                <view class="px-row py-s">
                    <view class="px-col pb-col">
                        <VwActivityDetailTitle :issm="issm" :one="view"/>
                    </view>
                </view>
                
                <VwActivityDetailAddrTime :one="view"/>

                <view v-if="issm" class="px-col"><VwActivityDetailInvite :one="view"/> </view>
                <view v-else class="px-col"><VwActivityDetailJoiner :one="view"/></view>
                
                <view class="pt-s bg-hui"></view>
                <VwActivityDetailPublisher :one="view"/>

                <view v-if="view.introduction">
                    <view class="pt-s bg-hui"></view>
                    <view class="px-row">
                        <view class="px-col">
                            <VwActivityDetailContent :one="view"/>
                        </view>
                    </view>
                </view>
                <view class="">
                    <VwActivityDetailGallery :one="view"/>
                </view>
                <CkSpace :h="3"/>
                <view class="mh-app-bottom-bar"></view>
            </template>
            <template #bom>
                <VwActivityDetailBom :one="view" :user="user" :isjoin="isjoin"/>
            </template>
        </DetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authGetters, authState, needLogin, orderReFresh, orderState, uiState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import activity_tool from '@/tool/modules/activity_tool';
import uniRouter from '@/tool/uni/uni-router';
import VwActivityDetailAddrTime from '@/view/activity/detail/VwActivityDetailAddrTime.vue';
import VwActivityDetailBanner from '@/view/activity/detail/VwActivityDetailBanner.vue';
import VwActivityDetailContent from '@/view/activity/detail/VwActivityDetailContent.vue';
import VwActivityDetailGallery from '@/view/activity/detail/VwActivityDetailGallery.vue';
import VwActivityDetailJoiner from '@/view/activity/detail/joiner/VwActivityDetailJoiner.vue';
import VwActivityDetailTitle from '@/view/activity/detail/VwActivityDetailTitle.vue';
import VwActivityDetailInvite from '@/view/activity/detail/joiner/VwActivityDetailInvite.vue';
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import VwActivityDetailBom from '@/view/activity/detail/bom/VwActivityDetailBom.vue';
import VwActivityDetailPublisher from '@/view/activity/detail/publisher/VwActivityDetailPublisher.vue';
import appRouter from '@/tool/uni/app-router';
import join_tool from '@/tool/modules/join_tool';

const view = computed((): Activity => acyState.view)
const user = computed(() => authState.user)
const joins = computed((): ActivityJoin[] => orderState.join_of_mine)

const isjoin = computed((): boolean => join_tool.judge_is_join(joins.value, view.value))

watch(() => view.value, (n, o) => {
    uniRouter.navigatorpg('index')
})

const aii = reactive({
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const issm = computed((): boolean => activity_tool.istyped_sm(view.value))

const funn = {
    back: () => {
        uniRouter.back()
    },
    init: () => {
        const src = view.value || { }
        // console.log('SRC =', src)
        if (!src) {
            appRouter.index()
        }
        if (!src.documentId) {
            appRouter.index()
        }
    }
}

onMounted(() => {
    pan_tooi.close_pan(aii.price_pan_idx)
})

nextTick(funn.init)
</script>


        <!--
        <VwAdPricePan
            @submit="funn.submit"
            :one="view" :idx="aii.price_pan_idx"/>
            -->