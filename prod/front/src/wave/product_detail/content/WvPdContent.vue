<template>
    <view class="softer" v-if="sts.is_buyed || is_publisher">
        <view v-if="me.contents && me.contents.length > 0" class="pt-s">
            <view><view class="h-1 bg-hr"></view></view>
            <!--<CoMoPdHeader>内容</CoMoPdHeader>-->
            <view class="">
                <CoMoPdHeader>付费内容</CoMoPdHeader>
                <view v-for="(n, m) in me.contents" :key="m">
                    <view class="fx-aii-btn-def">
                        <WvPdContentWord :content="n" :v="v"/>
                    </view>
                    <view class="pt-col">
                        <WvPdContentGalleries :content="n" :v="v"/>
                    </view>
                    <view class="px-row py fx-aii-btn-def">
                        <view class="px-col fs-s tiw fx-r row">
                            <view>
                                <CkSimpleTag>发布于</CkSimpleTag>
                                <CkSimpleTag class="px-s">{{ times.fmts(v.createdAt) }}</CkSimpleTag>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import server_content from '@/server/product/server_content';
import { future, futuring, promise } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import { nextTick, reactive } from 'vue';
import CoMoPdHeader from '../__component/CoMoPdHeader.vue';
import times from '@/tool/web/times';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import WvPdContentGalleries from './gallery/WvPdContentGalleries.vue';
import WvPdContentWord from './word/WvPdContentWord.vue';

const prp = defineProps<{
    v: Product, sts: ONE, is_publisher: boolean
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
        if (prp.sts.is_buyed || prp.is_publisher) {
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