<template>
    <view class="bg-con">
        <CoMoAdHeader>活动描述</CoMoAdHeader>
        <view class="pt-s pb coh">
            <view class="py-s px-row" v-for="(v, i) in cons" :key="i">
                <view class="px-col">
                    {{ v }}
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive } from 'vue';
import CoMoAdHeader from './component/CoMoAdHeader.vue';
import content_tool from '@/tool/modules/common/content_tool';
import { futuring, promise, timeout } from '@/tool/util/future';
import server_content from '@/server/activity/server_content';
import { is_nice_arr, must_one } from '@/tool/util/valued';

const prp = defineProps<{ one: Activity }>()
const aii = reactive({ ioading: false, contents: <ProductContent[]> [ ], init: false })

const cons = computed((): string[] => {
    const oo: ProductContent = must_one(top.value)
    let src: string = oo.content ? oo.content : oo.introduction
    if (!src) { src = prp.one.introduction }
    return content_tool.split_end(src)
})

const top = computed((): ProductContent => {
    const src: ProductContent[] = aii.contents || [ ]
    return src[0]
})

const funn = {
    fetching: () => futuring(aii, async () => {
        const nss: ProductContent[] = await server_content.by_activity(prp.one);
        if (is_nice_arr(nss)) {
            aii.contents = nss || [ ]
        }
        timeout(() => (aii.init = true))
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)
</script>

                <!--
                {{ one.introduction ? one.introduction : one.title }}
                -->
                
            <!--
            <view v-for="(v, i) in contents" :key="i">
                <view class="py-s">{{ v.txt }}</view>
            </view>
            -->
            <!--
            <view class="pt-col"></view>
            <view class="pt-col">
                <view class="d-ib pr pb" v-for="(v, i) in tags" :key="i">
                    <view class="btn bg-hui-x1 br-s px-s tit">{{ v.txt }}</view>
                </view>
            </view>-->