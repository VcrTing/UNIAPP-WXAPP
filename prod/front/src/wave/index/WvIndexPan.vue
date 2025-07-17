<template>
    <view class="">
        <view class="pt-s">
            <WvIndexConTop :ioading="aii.ioading" :change="change" 
                @refresh="funn.initing"
                @changetag="func.switchTag"/>
        </view>
        <view class="pt-s">
            <OScrollYFresh id="index_scroll"
                :options="scrolloptions"
                :styie="{ 
                    'position': 'relative', 'z-index': '99',
                    'height': 'calc( 100vh - 11.79rem - ' + (h || '0px') + ' )' }"
                @downrefresh="funn.next"
                @uprefresh="funn.initing"
                >
                <CkSpace v-if="!isphone" :h="1"/>
                <CoViDataLoading :ioading="index.ioading" :items="aii.items">
                    <WvIndexConList :items="aii.items"/>
                </CoViDataLoading>
                <WvIndexLowEmpty :index="index"/>
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
import { computed, nextTick, reactive, ref } from 'vue';
import { future, futuring } from '@/tool/util/future';
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import net_tool from '@/tool/http/net_tool';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import srp_p from '@/tool/strapi/srp_p';
import WvIndexConList from './content/WvIndexConList.vue';
import server_product from '@/server/product/server_product';
import WvIndexConTop from './content/WvIndexConTop.vue';
import def_tag from '@/server/__def/def_tag';
import { DATA_FILTER_TAB_DEF, DATA_FILTER_TABS } from '@/conf/conf-datas';
import { DEV_PRODUCT } from '@/conf/conf-dev';
import { uiGetters } from '@/memory/global';
import { must_arr } from '@/tool/util/valued';
import WvIndexLowEmpty from './__component/WvIndexLowEmpty.vue';

const prp = defineProps<{
    h: string
}>()

const deftag: Tag = def_tag.index
const sectag: Tag = def_tag.free

const isphone = computed((): boolean => uiGetters.isphone)

const aii = reactive({
    ioading: false, tag: deftag,
    items: <Product[]>[ ],
    pager: net_tool.__pager(isphone.value ? 12 : 24)
})

const change = reactive({
    tabs: DATA_FILTER_TABS, tab: DATA_FILTER_TAB_DEF,
})

const got = {
    buildparam: () => {
        let res = <ONE>{
            
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
            else if (id === sectag.id) {
                console.log('开始公开查询模式')
                srp_p.__eq(res, 'typed', DEV_PRODUCT.TYPED.FREE)
            }
        }
        // 构建排序方式
        // console.log('CHANGE TAB =', change.tab.sorted)
        res = change.tab.sorted(res)
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
        const src: Product[] = await server_product.index_recommond(param, aii.pager)
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
        const src: Product[] = await server_product.index_recommond(param, aii.pager)
        aii.items = src
    }),

    // 搜索顶部
    loadtop: async () => {
        const src: Product[] = await server_product.index_top()
        top.value = must_arr(src)
        aii.items.push(...top.value)
    }
}

const top = ref<Product[]>([ ])

const index = reactive({
    ioading: false, end: false, trigger: false
})

const func = {
    switchTag: (tag: Tag) => {
        aii.tag = tag;
        // console.log('-================= aii.tag =', aii.tag)
        funn.fetching();
    },
    reset: () => {
        index.end = false; aii.pager.page = 1;
        funn.initing()
    },
    init: () => futuring(aii, async () => {
        funn.loadtop()
        func.reset()
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

</script>
