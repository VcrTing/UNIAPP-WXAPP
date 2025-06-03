<template>
    <view class="ps-r zi-n">
        <view class="bg-con py">
            <VwIndexContTop @result="funn.switchTag"/>
        </view>
        <view class="pt-row">
            <OScrollYFresh id="index_scroll"
                :options="scrolloptions"
                :styie="{ 'height': 'calc( 100vh - 17em )' }"
                @downrefresh="funn.next"
                >
                <view class="px-row">
                    <view v-if="aii.ioading">
                        <CkDataIoading :h="12"/>
                    </view>
                    <view v-else>
                        <VwIndexContList :activities="aii.activities"/>
                    </view>
                </view>
                <view class="mh-5em"></view>
            </OScrollYFresh>
        </view>
    </view>
</template>
 
<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import VwIndexContList from './content/VwIndexContList.vue';
import VwIndexContTop from './content/VwIndexContTop.vue';
import { future, promise } from '@/tool/util/future';
import server_activity from '@/server/activity/server_activity';
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import net_tool from '@/tool/http/net_tool';
import { is_nice_arr, must_one } from '@/tool/util/valued';
import { pageIndexCommit, pageIndexDispatch, pageIndexState } from '@/memory/page';
import def_ativity from '@/server/__def/def_ativity';

// const prp = defineProps<{}>()

const aii = reactive({
    tag: <ActivityTag> { }, ioading: false, 
    activities: <Activity[]>[ ]
})

const pageoptions = computed((): Page.IndexPageDataActivityOptions => pageIndexState.page_index_data_options)

const pager = computed((): Pager => pageIndexState.index_pager)

const scrolloptions = computed((): OScrollOptions => {
    return {
        domid: 'index_scroll',
        iimit: 10,
        ioading: aii.ioading
    }
})


const got = {
    getoption: () => {
        const tagid: number = aii.tag.id
        const options: Page.IndexPageDataActivityOptions = pageoptions.value
        let option: Page.IndexDataActivityOption | null = options[ tagid ]

        if (option == null) {
            option = {
                tag: aii.tag,
                pager: net_tool.generate_pagination()
            }
        }

        options[ tagid ] = option
        pageIndexCommit('change', [ 'page_index_data_options', options ])

        return option
    },
    buildparam: (option: Page.IndexDataActivityOption) => {
        const res = <ONE>{
            
        }
        const tagid: number = must_one<ActivityTag>(option.tag).id
        if (tagid == 0) {

        }
        else {

            res['filters[activity_tags][id][$eq]'] = tagid
        }
        //
        return res;
    }
}

const deftag = def_ativity.tags.index

const funn = {


    next: () => funn.fetching(),
    fetching: () => future(async () => {
        aii.ioading = true

        let option: Page.IndexDataActivityOption = got.getoption()
        const tagid: number = must_one<ActivityTag>(option.tag).id

        if (tagid == deftag.id) {
            await func.loadindex()
        }
        else {
            const param: ONE = got.buildparam(option)
            const src: Activity[] = await server_activity.index(param, option.pager)
            aii.activities = src
        }
        aii.ioading = false
    }),

    switchTag: (tag: ActivityTag) => {
        aii.tag = tag;
        funn.fetching()
    },

}

const func = {
    loadindex: async () => {
        const cache: Activity[] = await pageIndexDispatch('get_index_activities')
        const origin: Activity[] = aii.activities || [];
        // 取交集
        const join: Activity[] = [ ]
        if (is_nice_arr(cache)) {
            const __ids: number[ ] = origin.map(e => e.id)
            for (let j= 0; j< cache.length; j++ ) {
                const __v: Activity = cache[ j ];
                const idx = __ids.indexOf(__v.id)
                if (idx < 0) {
                    join.push(__v)
                }
            }
        }
        // 赋值
        aii.activities = [ ...join, ...origin ]
    },
    init: () => future(async () => {
        await func.loadindex()
    })
}

onMounted(func.init)
</script>