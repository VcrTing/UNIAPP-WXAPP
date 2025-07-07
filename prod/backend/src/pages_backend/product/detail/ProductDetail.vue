<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :toph="h_banner">
            <template #bg>
                <WvPdBanner :one="view" :banners="banners" :toph="h_banner"/>
            </template>
            <template #top>
                <CoAppTopBackBar @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
            </template>
            <template #con>
                <WvPdTitle :v="view"/>
                <WvPdPublisherS v-if="!sts.is_buyed" :info="info" :v="view" :sts="sts" :is_publisher="is_publisher"/>
                <WvPdPrice :v="view" :sts="sts" :is_publisher="is_publisher"/>

                <WvPdDesc :v="view" :sts="sts"/>
                <WvPdContent :v="view" :sts="sts"/>
                
                <view v-if="sts.is_buyed">
                    <view class="pt-s bg-hui"></view>
                    <WvPdPublisher :v="view" :is_publisher="is_publisher"/>
                </view>
                <WvPdGallery :v="view"/>

                <!--
                <WvPdBom v-if="aii.init" 
                    :v="view" :user="user" :sts="sts"
                    :is_publisher="is_publisher"
                    />
                -->
                <WvPdCheckBom :v="view"/>
            </template>
        </DetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, appState, authGetters, authState, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import appRouter from '@/tool/uni/app-router';
import { future, futuring, promise, timeout } from '@/tool/util/future';
import server_joining from '@/server/activity/server_joining';
import media_tool from '@/tool/modules/common/media_tool';
import { must_arr, must_one } from '@/tool/util/valued';
import { prodState } from '@/memory/moduies';
//
import WvPdBanner from '@/wave_backend/product_detail/media/WvPdBanner.vue';
import product_tool from '@/tool/modules/product_tool';
import WvPdTitle from '@/wave_backend/product_detail/top/WvPdTitle.vue';
import WvPdPrice from '@/wave_backend/product_detail/top/WvPdPrice.vue';
import WvPdDesc from '@/wave_backend/product_detail/top/WvPdDesc.vue';
import WvPdPublisher from '@/wave_backend/product_detail/member/WvPdPublisher.vue';
import WvPdGallery from '@/wave_backend/product_detail/media/WvPdGallery.vue';
import WvPdContent from '@/wave_backend/product_detail/content/WvPdContent.vue';
import WvPdPublisherS from '@/wave_backend/product_detail/member/WvPdPublisherS.vue';
import WvPdCheckBom from '@/wave_backend/product_detail/WvPdCheckBom.vue';

const view = computed((): Product => prodState.view)

const aii = reactive({ init: false, ioading: false, joiners: <ActivityJoin[]>[ ] })
const sts = reactive({ is_in_cart: false, is_buyed: false })

const funn = {
    ioad_joiners: () => futuring(aii, async () => {
        const actid: string = view.value.documentId || ''
        if (actid) {
            const joiners: ActivityJoin[] = await server_joining.join_of_activity(actid)
            aii.joiners = joiners
        }
    }),
    check: (src: Product) => {
        sts.is_in_cart = false // cart_tool.is_in_cart(src)
        sts.is_buyed = true // order_tool.isbuyed(src)
    },
    back: () => { uniRouter.back() },
    init: () => future(async () => {
        try {
            const src: Product = view.value || { }
            if (!src) {
                appRouter.index()
            }
            if (!src.documentId) {
                appRouter.index()
            }
            funn.check(src)
        }
        finally {
            timeout(() => { aii.init = true })
        }
    })
}

nextTick(funn.init)
watch(() => view.value, (n, o) => { uniRouter.navigatorpg('index') })

const banners = computed((): Media[] => product_tool.getbanner(must_one<Product>(view.value)))
const h_banner = computed((): number => media_tool.cpu_index_banner_h(banners.value, uiState.w))
const is_publisher = computed((): boolean => {
    const puber: User = must_one(view.value.user)
    const uid: number = authGetters.userid
    return (puber.id === uid);
})
const info = computed((): AppInfo => appState.info) 
</script>
