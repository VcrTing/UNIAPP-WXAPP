<template>
    <view class="ps-r zi-n">
        <view class="pt-s">
            <VwIndexContTop @result="funn.switchTag"/>
        </view>
        <view class="">
            <OScrollYFresh id="index_scroll"
                :options="scrolloptions"
                :styie="{ 'height': 'calc( 100vh - 16rem )' }"
                @downrefresh="funn.next"
                @uprefresh="funn.initing"
                >
                <view class="pt-row"></view>
                <CoViDataLoading :ioading="index.ioading" :items="aii.activities">
                    <VwIndexContList :activities="aii.activities"/>
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
import { computed, onMounted, reactive } from 'vue';
import VwIndexContList from './content/VwIndexContList.vue';
import VwIndexContTop from './content/VwIndexContTop.vue';
import { future, futuring, promise } from '@/tool/util/future';
import server_activity from '@/server/activity/server_activity';
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import net_tool from '@/tool/http/net_tool';
import { pageIndexDispatch, pageIndexState } from '@/memory/page';
import def_ativity from '@/server/__def/def_ativity';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import srp_p from '@/tool/strapi/srp_p';

// const prp = defineProps<{}>()

const aii = reactive({
    tag: <Tag> { }, ioading: false,
    activities: <Activity[]>[ ],
    pager: net_tool.__pager()
})

// const pageoptions = computed((): Page.IndexPageDataActivityOptions => pageIndexState.page_index_data_options)
// const pager = computed((): Pager => pageIndexState.index_pager)

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
            // res['']
            // srp_p.__eq(res, 'isRecommended', tagid)
            srp_p.__eq(res, 'activity_tags][documentId', tagid)
            // res['filters[activity_tags][documentId][$eq]'] = tagid
        }
        else {

        }
        //
        return res;
    }
}

const deftag = def_ativity.tags.index


const funn = {
    next: () => futuring(aii, async () => {
        if (index.end) {
            console.log('到底啦。')
            return
        }
        aii.pager.page += 1
        const param: ONE = got.buildparam()
        const src: Activity[] = await server_activity.index_recommond(param, aii.pager)
        if (src && src.length > 0) {
            aii.activities.push(...src)
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
        const src: Activity[] = await server_activity.index_recommond(param, aii.pager)
        aii.activities = src
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
            aii.activities = cache
        }
    },
    init: () => futuring(index, async () => {
        func.reset()
        await func.loadindex()
    })
}

onMounted(func.init)
        /*
        const origin: Activity[] = aii.activities || [];
        // 取交集
        const join: Activity[] = [ ]
        if (is_nice_arr(cache)) {
            const __ids: string[ ] = origin.map(e => e.documentId)
            // 拿出缓存里的
            for (let j= 0; j< cache.length; j++ ) {
                const __v: Activity = cache[ j ];
                const idx = __ids.indexOf(__v.documentId)
                if (idx < 0) {
                    join.push(__v)
                }
            }
        }
        // 赋值
        aii.activities = [ ...join, ...origin ]
        */
/*

    getoption: () => {
        const tagid: string = aii.tag.documentId
        const options: Page.IndexPageDataActivityOptions = pageoptions.value
        let option: Page.IndexDataActivityOption | null = options[ tagid ]

        if (option == null) {
            option = {
                tag: aii.tag,
                pager: net_tool.__pager()
            }
        }

        options[ tagid ] = option
        pageIndexCommit('change', [ 'page_index_data_options', options ])

        return option
    },

*/
</script>
