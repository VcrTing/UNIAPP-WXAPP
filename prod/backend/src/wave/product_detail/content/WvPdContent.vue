<template>
    <view class="softer" v-if="product_tool.has_content(v)">
        <view v-if="sts.is_buyed" class="pt-s">
            <view class="h7 py-x2 px-row"><view class="px-col">商品内容</view></view>
            <CoViDataLoading :ioading="me.ioading" :items="me.contents">
                <view class="">
                    <view v-for="(n, m) in me.contents" :key="m">
                        <view v-if="content_tool.is_gallery(n)">
                            <WvPdContentGalleries :content="n" :v="v"/>
                        </view>
                        <view v-else>
                            <WvPdContentWord :content="n" :v="v"/>
                        </view>
                        <view class="px-row py">
                            <view class="px-col fs-s tiw fx-r row">
                                <view>
                                    <CkSimpleTag>发布于</CkSimpleTag>
                                    <CkSimpleTag class="px-s">{{ times.fmts(v.createdAt) }}</CkSimpleTag>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </CoViDataLoading>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_content from '@/server/product/server_content';
import content_tool from '@/tool/modules/common/content_tool';
import product_tool from '@/tool/modules/product_tool';
import { future, futuring, promise } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import { nextTick, reactive } from 'vue';
import CoMoPdHeader from '../__component/CoMoPdHeader.vue';
import times from '@/tool/web/times';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import UiI from '@/ui/element/i/UiI.vue';
import WvPdContentGalleries from './gallery/WvPdContentGalleries.vue';
import WvPdContentWord from './word/WvPdContentWord.vue';

const prp = defineProps<{
    v: Product, sts: ONE
}>()

const me = reactive({
    ioading: false,
    contents: <ProductContent[]>[ ]
})

const funn = {
    fetching: () => futuring(me, async () => {
        const contents: ProductContent[] = await server_content.by_product(prp.v)
        if (is_nice_arr(contents)) {
            me.contents = contents
        }
    }),
    init: () => promise(() => {
        if (prp.sts.is_buyed) {
            funn.fetching()
        }
        else {
            
        }
    })
}

nextTick(funn.init)
</script>

        <!--
        <view class="pt-x2 fx-aii-btn-def" v-else>
            <view class="fx-c" v-if="sts.is_in_cart">
                <OButton color="pri">获得资源</OButton>
            </view>
            <view class="fx-c" v-else>
                <OButton color="pri">
                    <!- -<UiI i="check"/>- ->
                    <text class="">等待结算</text>
                </OButton>
            </view>
        </view>
        -->
        <!--
        <view class="px-row" v-for="(n, m) in func.content(v)" :key="m">
            <view class="px-col py">{{ n }}</view>
        </view>
        -->