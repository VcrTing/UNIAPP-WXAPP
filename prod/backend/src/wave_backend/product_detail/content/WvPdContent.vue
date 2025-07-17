<template>
    <view class="softer">
        <view class="pt-s">
            <view class="h7 py-x2 px-row"><view class="px-col">商品内容</view></view>
            <CoViDataLoading :ioading="me.ioading" :items="me.contents">
                <view class="">
                    <view v-for="(n, m) in me.contents" :key="m">
                        <view>
                            <WvPdContentWord :content="n" :v="v"/>
                        </view>
                        <view class="pt">
                            <WvPdContentGalleries :content="n" :v="v" @sex="funn.sex"/>
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
import times from '@/tool/web/times';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import WvPdContentGalleries from './gallery/WvPdContentGalleries.vue';
import WvPdContentWord from './word/WvPdContentWord.vue';

const prp = defineProps<{
    v: Product, sts: ONE
}>()

const me = reactive({
    ioading: false,
    contents: <ProductContent[]>[ ]
})

const emt = defineEmits([ 'sex' ])

const funn = {
    fetching: () => futuring(me, async () => {
        const contents: ProductContent[] = await server_content.by_product(prp.v)
        if (is_nice_arr(contents)) {
            me.contents = contents
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    }),
    sex: (v: Media) => emt('sex', v)
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