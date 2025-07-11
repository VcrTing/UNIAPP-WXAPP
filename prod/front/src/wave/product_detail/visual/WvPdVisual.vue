<template>
    <view>
    </view>
</template>

<script setup lang="ts">
import { prodDispatch } from '@/memory/moduies';
import server_product from '@/server/product/server_product';
import server_visual from '@/server/product/server_visual';
import { futuring, timeout } from '@/tool/util/future';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { nextTick, reactive } from 'vue';

const prp = defineProps<{
    v: Product
}>()

const DELAY = 800

const me = reactive({ ioading: false })

const funn = {
    // 增加商品访问量
    productView: () => timeout(async () => {
        await server_product.view1(prp.v)
    }),

    // 增加用户标签的喜爱程度
    preferView: async () => {
        const tags: Tag[] = must_arr(prp.v.tags)
        if (is_nice_arr(tags)) {
            // 
            // tagTool.value.add_view(tags)
            await prodDispatch('add_prefer_view', tags)
        }
    },
    // 增加 VISUAL
    visual: async () => {
        const src: ProductVisual = await server_visual.one(prp.v)
        const vis: ProductVisual = await server_visual.plus_or_edit(prp.v, src)
        if (vis && vis.documentId) {
            //
        }
    },
    // 
    init: () => timeout(() => futuring(me, async () => {
        funn.productView()
        await funn.visual()
        await funn.preferView()
    }), DELAY)
}

nextTick(funn.init)
</script>