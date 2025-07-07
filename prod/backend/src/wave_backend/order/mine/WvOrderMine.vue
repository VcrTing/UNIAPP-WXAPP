<template>
    <view class="py-row">
        <OScrollX>
        </OScrollX>
        <CoViDataLoading :ioading="aii.ioading" :items="aii.products" @refresh="funn.fetching">
            <view :class="isphone ? 'px-row' : 'row'">
                <view v-for="(v, i) in aii.products" class="pb-row"
                    :class="w_clazz">
                    <view class="bg-con br-t o-h">
                    <CoMoOdProductLine :v="v" @takeon="funn.takeon"/>
                    </view>
                </view>
            </view>
        </CoViDataLoading>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { uiGetters } from '@/memory/global';
import server_publish from '@/server/publish/server_publish';
import { futuring, promise, timeout } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';
import CoMoOdProductLine from '../__component/CoMoOdProductLine.vue';
import server_pubplus from '@/server/publish/server_pubplus';
import product_tool from '@/tool/modules/product_tool';
// const prp = defineProps<{}>()

const aii = reactive(<ONE>{
    ioading: false, products: <Product[]>[ ]
})

const funn = {
    takeon: (v: Product) => futuring(aii, async () => {
        let pm: ONE = { }
        pm = product_tool.init_inv(v.invTyped, pm)
        if (product_tool.is_inv_many(v)) {
            pm['inv'] = 3
        }
        console.log('PARAM =', pm)
        //
        const src: Product = await server_pubplus.takeon(v, pm['inv'])
        if (src && src.documentId) {
            timeout(async () => await funn.__fetching())
        }
    }),
    __fetching: async () => {
        const __pm: ONE = { }
        const src: Product[] = await server_publish.mineAii(__pm)
        if (is_nice_arr(src)) { aii.products = src }
    },
    fetching: () => futuring(aii, async () => { await funn.__fetching() }),
    init: () => promise(() => { funn.fetching() }) 
}

nextTick(funn.init)

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100 d-ib'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>