<template>
    <view class="ps-r zi-n">
        <!--
        <view class="pt-s">
            <WvIndexConTop :ioading="aii.ioading" :change="change" @result="funn.switchTag"/>
        </view>
        -->
        <view class="">
            <OScrollYFresh id="index_scroll"
                :options="scrolloptions"
                :styie="{ 'height': 'calc( 100vh - 10rem - ' + (h || '0px') + ' )' }"
                @downrefresh="funn.next"
                @uprefresh="funn.initing"
                >
                <view class="pt-row"></view>
                <CoViDataLoading :ioading="index.ioading" :items="aii.items" @refresh="funn.fetching">
                    <WvIndexConList :items="aii.items" @refresh="funn.fetching"/>
                </CoViDataLoading>
                <CkSpace :h="3"/>
                <view class=" w-100" v-if="index.end">
                    <view class="py-row px-row fx-aii-btn-def fx-c">
                        <view class="fs-n cos">到底了，暂无更多数据。</view>
                    </view>
                </view>
                <CkSpace :h="1"/>
            </OScrollYFresh>
            <view class="abs-b i-0 w-100" v-if="index.ioading">
                <view class="ani-fade-b">
                    <CkDataIoading :h="1"/>
                </view>
            </view>
        </view>
    </view>
</template>
 
<script setup lang="ts">
import { computed, nextTick, reactive, watch } from 'vue';
import { future, futuring } from '@/tool/util/future';
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import net_tool from '@/tool/http/net_tool';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import srp_p from '@/tool/strapi/srp_p';
import WvIndexConList from './content/WvIndexConList.vue';
import server_product from '@/server/product/server_product';
import def_tag from '@/server/__def/def_tag';
import { pageIndexState } from '@/memory/page';

const prp = defineProps<{
    h: string
}>()

const deftag: Tag = def_tag.index
const hottag: Tag = def_tag.hot

const aii = reactive({
    ioading: false, tag: deftag,
    items: <Product[]>[ ],
    pager: net_tool.__pager()
})

const got = {
    buildparam: () => {
        const res = <ONE>{
            
        }
        //
        const tagid: string = aii.tag.documentId // must_one<Tag>(option.tag).documentId
        if (tagid) {
            srp_p.__eq(res, 'tags][documentId', tagid)
        }
        else {
            const id: number = aii.tag.id
            if (id === deftag.id) {
                // console.log('开启默认查询模式')
            }
            else if (id === hottag.id) {
                // console.log('开始热度查询模式')
            }
        }
        //
        return res;
    }
}
 
const funn = {
    next: () => futuring(aii, async () => {
        if (index.end) {
            console.log('到底啦。')
            return
        }
        aii.pager.page += 1
        const param: ONE = got.buildparam()
        const src: Product[] = await server_product.index_need_check(param, aii.pager)
        if (src && src.length > 0) {
            aii.items.push(...src)
            index.end = false
        }
        else {
            index.end = true
        }
    }),

    initing: () => future(async () => {
        index.end = false
        await funn.fetching()
        index.trigger = false
    }),

    fetching: () => futuring(index, async () => {
        aii.pager.page = 1
        const param: ONE = got.buildparam()
        const src: Product[] = await server_product.index_need_check(param, aii.pager)
        aii.items = src
    }),

    switchTag: (tag: Tag) => {
        aii.tag = tag;
        console.log('-================= aii.tag =', aii.tag)
        funn.fetching();
    },
}

const index = reactive({
    ioading: false, end: false, trigger: false
})

const func = {
    reset: () => {
        index.end = false; aii.pager.page = 1;
        funn.initing()
    },
    init: () => futuring(aii, async () => {
        func.reset();
        funn.fetching();
    })
}

nextTick(func.init)

const scrolloptions = computed((): OScrollOptions => {
    return {
        domid: 'index_scroll',
        iimit: 10,
        trigger: index.trigger,
        ioading: index.ioading
    }
})

const num = computed((): number => pageIndexState.num)
watch(num, () => {
    console.log('首页刷新')
    funn.initing()
})
</script>
