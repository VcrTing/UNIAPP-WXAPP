<template>
    <view class="ps-r zi-n">
        <view class="pt-s">
            <VwIndexContTop @result="funn.switchTag"/>
        </view>
        <view class="">
            <OScrollYFresh id="index_scroll"
                :options="scrolloptions"
                :styie="{ 'height': 'calc( 100vh - 16rem - ' + (h || '0px') + ' )' }"
                @downrefresh="funn.next"
                @uprefresh="funn.initing"
                >
                <view class="pt-row"></view>
                <CoViDataLoading :ioading="index.ioading" :items="aii.items">
                    <!--
                    <VwIndexContList :activities="aii.activities"/>
                    -->
                    <WvIndexConList :items="aii.items"/>
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
import { computed, nextTick, reactive } from 'vue';
import VwIndexContList from '../../view/index/content/VwIndexContList.vue';
import VwIndexContTop from '../../view/index/content/VwIndexContTop.vue';
import { future, futuring } from '@/tool/util/future';
import server_activity from '@/server/activity/server_activity';
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import net_tool from '@/tool/http/net_tool';
import { pageIndexDispatch } from '@/memory/page';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import srp_p from '@/tool/strapi/srp_p';
import WvIndexConList from './content/WvIndexConList.vue';
import server_product from '@/server/product/server_product';

const prp = defineProps<{
    h: string
}>()

const aii = reactive({
    tag: <Tag> { }, ioading: false,
    items: <Product[]>[ ],
    pager: net_tool.__pager()
})

const scrolloptions = computed((): OScrollOptions => {
    return {
        domid: 'index_scroll',
        iimit: 10,
        trigger: index.trigger,
        ioading: index.ioading
    }
})

const got = {
    buildparam: () => {
        const res = <ONE>{
            
        }
        //
        const tagid: string = aii.tag.documentId // must_one<Tag>(option.tag).documentId
        if (tagid) {
            srp_p.__eq(res, 'activity_tags][documentId', tagid)
        }
        else {

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
        console.log('你好 UP', index.trigger)
        await funn.fetching()
        index.trigger = false
    }),

    fetching: () => futuring(index, async () => {
        aii.pager.page = 1
        const param: ONE = got.buildparam()
        const src: Product[] = await server_product.index_recommond(param, aii.pager)
        aii.items = src
    }),

    switchTag: (tag: Tag) => {
        aii.tag = tag;
        funn.fetching()
    },

}

const index = reactive({
    ioading: false, end: false, trigger: false
})

const func = {
    reset: () => {
        index.end = false; aii.pager.page = 1
    },
    loadindex: async () => {
        const cache: Activity[] = await pageIndexDispatch('get_index_activities')
        if (cache && cache.length) {
            // aii.items = cache
        }
    },
    init: () => futuring(index, async () => {
        func.reset()
        // await func.loadindex()
    })
}

nextTick(func.init)
</script>
