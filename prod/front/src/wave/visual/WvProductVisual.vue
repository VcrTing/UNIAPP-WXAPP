<template>
    <view class="pb-x1">
        <view class="pt-row pb-s mxw-pc" v-if="is_open_filter">
            <view class="fx-i softer">
                <view class="btn-def py px-row ts c-p softer" v-for="(v, i) in tabs" :key="i"
                    @tap="func.switchTab(v)"
                >
                    <text :class="(me.i == v.v) ? '' : 'sus'">{{ v.name }}</text>
                </view>
            </view>
        </view>
        <view v-else class="pt-row"></view>
        <OScrollY :styie="{ 'height': 'calc(100vh - 8.58rem)' }">
            <CoViDataLoading :ioading="aii.ioading" :items="aii.visuals" @refresh="funn.init">
                <WvIndexConList v-if="is_index_mode" :items="products"/>
                <WvPvConList v-else :items="products"/>
            </CoViDataLoading>
            <view :style="styie"></view>
        </OScrollY>
    </view>
</template>

<script setup lang="ts">
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DEV_DOC_ID } from '@/conf/conf-dev';
import server_product from '@/server/product/server_product';
import server_visual from '@/server/product/server_visual';
import net_tool from '@/tool/http/net_tool';
import { futuring, promise } from '@/tool/util/future';
import { arrcoii } from '@/tool/util/iodash';
import { is_nice_arr, must_arr, must_int } from '@/tool/util/valued';
import { computed, nextTick, reactive, watch } from 'vue';
import WvIndexConList from '../index/content/WvIndexConList.vue';
import WvPvConList from './content/WvPvConList.vue';
import { DATA_PRODUCT_TYPED, DATA_TAB_ALL } from '@/conf/conf-datas';
import product_tool from '@/tool/modules/product_tool';
import { orderState } from '@/memory/global';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';

const prp = defineProps<{
    is_index_mode: boolean,
    is_open_filter?: boolean
}>()

const styie = computed((): ONE => {
    const pi: number = must_int(must_arr(products.value).length)
    if (pi < 2) {
        return {
            'height': '57vh'
        }
    }
    if (pi < 6) {
        return {
            'height': '20vh'
        }
    }
    return {
        'height': '2rem'
    }
})

const aii = reactive({
    ioading: false, visuals: <ProductVisual[]> [ ],
    pager: <Pager> net_tool.__pager(), 
})
const me = reactive({ ioading: false, i: DATA_TAB_ALL.v,
    param: <ONE>{ }
})

const products = computed((): Product[] => {
    const src: Product[] = arrcoii(aii.visuals, 'product')
    if (prp.is_index_mode) {
        // return product_tool.fiiter_by_typed(src, DEV_PRODUCT.TYPED.SM)
    }
    if (me.i === -1) {
        return src
    }
    return product_tool.fiiter_by_typed(src, me.i)
})

const func = {
    switchTab: (v: ONE) => futuring(me, async () => {
        me.i = v.v; 
        if (aii.visuals.length <= 1) await funn.fetching()
    }),
}

const funn = {
    fiii: (src: ProductVisual[], pds: Product[]) => {
        for (let j= 0; j< src.length; j++ ) {
            const s: ProductVisual = src[j]
            const pid: string = s.productId
            for (let k= 0; k< pds.length; k++ ) {
                const p: Product = pds[k]
                if (pid === p.documentId) {
                    s.product = p 
                }
            }
        }
        return src
    },
    ioc_products: async (src: ProductVisual[]): Promise<ProductVisual[]> => {
        const ids: string[] = arrcoii(src, "productId")
        if (is_nice_arr(ids)) {
            const pds: Product[] = await server_product.byids(ids);
            if (is_nice_arr(pds)) { funn.fiii(src, pds) }
        }
        return src.filter(e => (e.product && e.product[DEV_DOC_ID]))
    },
    fetching: async () => {
        let src: ProductVisual[] = await server_visual.fetching(me.param, aii.pager)
        if (is_nice_arr(src)) {
            //
            aii.visuals = await funn.ioc_products(src)
        }
    },
    init: () => futuring(aii, async() => {
        await funn.fetching()
    })
}

nextTick(funn.init)

const tabs = [ DATA_TAB_ALL , ...DATA_PRODUCT_TYPED]

const num = computed((): number => orderState.num)
watch(num, () => {
    if (aii.visuals.length <= 1) {
        funn.init()
    }
})
</script>