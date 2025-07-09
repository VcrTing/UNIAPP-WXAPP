<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBar clazz="bg-con" :mat="true">
            <view class="fx-i">
                <view v-for="(v, i) in aii.tabs" :key="i" class="ts">
                    <OButton :color="(aii.iive == v.v) ? 'pri-iht' : 'wht'" :weak="true" v-if="aii.iive == v.v" 
                        :clazz="'ts py px-row'">
                        <text class="fw-550">{{ v.name }}</text>
                    </OButton>
                    <view @tap="aii.iive = v.v" class="ts py px-row fx-aii-btn-pri-iht tid" v-else>{{ v.name }}</view>
                </view>
            </view>
        </CoAppTopBar>
        <view class="">
            <OScrollY :styie="{
                'height': 'calc(100vh - 8em)'
            }">
                <view class="pt-s"></view>
                <view v-if="aii.iive == 0">
                    <CoViDataLoading :ioading="aii.ioading" :items="carts">
                        <WvCartNow :carts="carts" :choises="aii.choises"/>
                    </CoViDataLoading>
                </view>
                <view v-else>
                    <WvProductVisual :is_index_mode="true"/>
                </view>
                <CkSpace :h="2"/>
            </OScrollY>
        </view>
		<CoAppBottomBar :mat="false"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { orderState, uiState } from '@/memory/global';
import { pageCartState } from '@/memory/page';
import server_product from '@/server/product/server_product';
import cart_tool from '@/tool/modules/cart_tool';
import { futuring, promise, timeout } from '@/tool/util/future';
import { arrcoii } from '@/tool/util/iodash';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import WvCartNow from '@/wave/cart/WvCartNow.vue';
import WvProductVisual from '@/wave/visual/WvProductVisual.vue';
import { computed, nextTick, reactive, watch } from 'vue';
//
const code = computed(() => { return storage.get('PAGE_CART_KEY') || 0 })
const num = computed((): number => pageCartState.num)
watch(num, () => {
    console.log('更新')
    funn.fiii_products()
})
//
const carts = computed((): Page.CartDataOptions => must_arr(pageCartState.carts))

const aii = reactive(<ONE>{
    ioading: false, iive: 0, init: false,
    tabs: [
        { name: '购物车', v: 0 },
        { name: '浏览记录', v: 1 },
    ],
    products: <Product[]>[ ], choises: [ ]
})

const funn = {
    fiii_products: () => futuring(aii, async () => {
        const ids: string[] = arrcoii(carts.value)
        const pss: Product[] = await server_product.byids(ids)
        if (is_nice_arr(pss)) {
            aii.products = pss || [ ];
            cart_tool.fiii_products(carts.value, aii.products)
        }
    }),
    init: () => promise(() => {
        aii.iive = code.value;
        funn.fiii_products()
    })
}

nextTick(funn.init)

</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

                <!--
                <view>
                    <OButtonDef>
                        <text class="fs-n pr-t">深圳</text>
                        <UiI clazz="fs-s d-ib" :i="'b'"/>
                    </OButtonDef>
                </view>
                -->