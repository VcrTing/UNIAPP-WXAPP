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
                <WvPdContent :v="view" :sts="sts" :is_publisher="is_publisher"/>
                
                <view v-if="sts.is_buyed">
                    <view class="pt-s bg-hui"></view>
                    <WvPdPublisher :v="view" :is_publisher="is_publisher"/>
                </view>
                <WvPdGallery :v="view"/>

                <WvPdBom v-if="aii.init" @back="funn.back"
                    :v="view" :user="user" :sts="sts"
                    :is_publisher="is_publisher"
                    />
            </template>
        </DetailLayout>
        <WvPdVisual v-if="aii.init" :v="view"/>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, appState, authGetters, authState, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import { future, timeout } from '@/tool/util/future';
import media_tool from '@/tool/modules/common/media_tool';
import { must_one } from '@/tool/util/valued';
import { prodReFresh, prodState } from '@/memory/moduies';
import WvPdBanner from '@/wave/product_detail/media/WvPdBanner.vue';
import product_tool from '@/tool/modules/product_tool';
import WvPdTitle from '@/wave/product_detail/top/WvPdTitle.vue';
import WvPdPrice from '@/wave/product_detail/top/WvPdPrice.vue';
import WvPdDesc from '@/wave/product_detail/top/WvPdDesc.vue';
import WvPdPublisher from '@/wave/product_detail/member/WvPdPublisher.vue';
import WvPdGallery from '@/wave/product_detail/media/WvPdGallery.vue';
import WvPdContent from '@/wave/product_detail/content/WvPdContent.vue';
import cart_tool from '@/tool/modules/cart_tool';
import WvPdBom from '@/wave/product_detail/WvPdBom.vue';
import order_tool from '@/tool/modules/order_tool';
import WvPdPublisherS from '@/wave/product_detail/member/WvPdPublisherS.vue';
import WvPdVisual from '@/wave/product_detail/visual/WvPdVisual.vue';
import appRouter from '@/tool/uni/app-router';
import open_of_product from '@/server/__func/open_of_product';

const view = computed((): Product => prodState.view)
const user = computed(() => authState.user)

const aii = reactive({ init: false, ioading: false, back: '' })
const sts = reactive({ is_in_cart: false, is_buyed: false, is_empty: false })

const funn = {
    check: (src: Product) => {
        sts.is_in_cart = cart_tool.is_in_cart(src)
        sts.is_buyed = order_tool.isbuyed(src)
        sts.is_empty = product_tool.getinv(src) === 0
    },
    back: () => { 
        // console.log('back =', aii.back)
        if (aii.back) { uniRouter.redpg(aii.back) }
        else { uniRouter.back() }
    },

    // 若是直接进入
    redin: async (src: Product) => {
        if (!src.documentId) {
            const { product, back, redin } = uniRouter.param()
            aii.back = back || ''
            // console.log('直接进入了。pp =', product, back, redin)
            if (redin === '1') {
                if (product) {
                    const p: Product = await open_of_product.__v( product );
                    await prodReFresh('view', p)
                    // console.log('优先加载 p =', view.value)
                }
            }
            else {
                appRouter.index()
            }
            // console.log('直接进入了。pp =', uniRouter.param())
        }
    },
 
    //
    // http://localhost:5174/#/pages/product/detail/ProductDetail?product=dql9od9sneonuprk3kcyja28&redin=1&back=index
    init: () => future(async () => {
        try {
            const src: Product = view.value || { }
            await funn.redin(src)
            if (!src) {
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
// watch(() => view.value, (n, o) => { uniRouter.navigatorpg('index') })

const banners = computed((): Media[] => product_tool.getbanner(must_one<Product>(view.value)))
const h_banner = computed((): number => media_tool.cpu_index_banner_h(banners.value, uiState.w))
const is_publisher = computed((): boolean => {
    const puber: User = must_one(view.value.user)
    const uid: number = authGetters.userid
    return (puber.id === uid);
})
const info = computed((): AppInfo => appState.info) 

    /*
    ioad_joiners: () => futuring(aii, async () => {
        const actid: string = view.value.documentId || ''
        if (actid) {
            const joiners: ActivityJoin[] = await server_joining.join_of_activity(actid)
            aii.joiners = joiners
        }
    }),
    */
</script>
