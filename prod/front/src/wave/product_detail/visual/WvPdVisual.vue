<template>
    <view>
    </view>
</template>

<script setup lang="ts">
import { authGetters, soDispatch } from '@/memory/global';
import { prodDispatch } from '@/memory/moduies';
import server_product from '@/server/product/server_product';
import server_visual from '@/server/product/server_visual';
import { futuring, timeout } from '@/tool/util/future';
import { is_nice_arr, must_arr, must_one } from '@/tool/util/valued';
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

    // 增加一个发布者浏览量
    sheVisited: async () => {
        const u: User = must_one(prp.v.user)
        await soDispatch('visited_you_product', u)
    },

    // 增加用户标签的喜爱程度
    preferView: () => timeout(async () => {
        const tags: Tag[] = must_arr(prp.v.tags)
        if (is_nice_arr(tags)) {
            // 
            // tagTool.value.add_view(tags)
            await prodDispatch('add_prefer_view', tags)
        }
    }, DELAY / 2),
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
        await funn.sheVisited()
        if (authGetters.is_login) {
            await funn.visual()
            await funn.preferView()
        }
    }), DELAY)
}

nextTick(funn.init)
</script>