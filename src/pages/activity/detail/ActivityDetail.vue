<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :toph="h_banner">
            <template #bg>
                <VwActivityDetailBanner :one="view" :banners="banners" :toph="h_banner"/>
            </template>
            <template #top>
                <CoAppTopBackBar @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
            </template>
            <template #con>
                <VwActivityDetailTitle :issm="issm" :one="view"/>
                <VwActivityDetailAddrTime :one="view"/>

                <view><VwActivityDetailJoiner :one="view" :joiners="aii.joiners"/></view>
                
                <view v-if="issm"><VwActivityDetailInvite :one="view" :joiners="aii.joiners"/> </view>
                <view v-if="!issm">
                    <view class="pt-s bg-hui"></view>
                    <VwActivityDetailPublisher :one="view"/>
                </view>

                <view class="softer" v-if="view.introduction">
                    <view class="pt-s bg-hui"></view>
                    <VwActivityDetailContent :one="view"/>
                </view>
                <view class="softer">
                    <VwActivityDetailGallery :one="view"/>
                </view>
                
                <VwActivityDetailBom :one="view" :user="user" :isjoin="isjoin"/>
            </template>
        </DetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authGetters, authState, needLogin, orderReFresh, orderState, uiState } from '@/memory/global';
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
import { futuring, promise } from '@/tool/util/future';
import server_joining from '@/server/activity/server_joining';
import media_tool from '@/tool/modules/media_tool';
import { must_one } from '@/tool/util/valued';

const view = computed((): Activity => acyState.view)
const user = computed(() => authState.user)
const joins = computed((): ActivityJoin[] => orderState.join_of_mine)

// const joiners = computed((): ActivityJoin[] => view.value.activity_registrations || [ ])

const isjoin = computed((): boolean => join_tool.judge_is_join(joins.value, view.value))

watch(() => view.value, (n, o) => {
    uniRouter.navigatorpg('index')
})

const aii = reactive({
    ioading: false, joiners: <ActivityJoin[]>[ ], 
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const issm = computed((): boolean => activity_tool.istyped_sm(view.value))

const funn = {
    ioad_joiners: () => futuring(aii, async () => {
        const actid: string = view.value.documentId || ''
        if (actid) {
            const joiners: ActivityJoin[] = await server_joining.join_of_activity(actid)
            console.log('joiners =', joiners)
            aii.joiners = joiners
        }
    }),

    back: () => {
        uniRouter.back()
    },
    init: () => promise(() => {
        const src = view.value || { }
        if (!src) {
            appRouter.index()
        }
        if (!src.documentId) {
            appRouter.index()
        }
        funn.ioad_joiners()
    })
}

nextTick(funn.init)

const banners = computed((): ActivityMedia[] => activity_tool.getbanner(must_one<Activity>(view.value)))
const h_banner = computed((): number => media_tool.cpu_index_banner_h(banners.value, uiState.w))

</script>


        <!--
        <VwAdPricePan
            @submit="funn.submit"
            :one="view" :idx="aii.price_pan_idx"/>
            -->