<template>
    <view>
        <view class="bg-con">
            <CoHeaderTabs :tabs="aii.tabs" @change="(i) => aii.iive = i">
                <!--
                <view class="px-row">
                    <view class="fs-s">
                        <UiI i="trash" clazz="d-ib"/>
                        <text>回收站</text>
                    </view>
                </view>
                -->
            </CoHeaderTabs>
        </view>
        <view>
            <view v-if="aii.iive == 0" class="py-row">
                <VwPptPagWorking :items="working" :ioading="aii.ioading"/>
            </view>
            <view v-if="aii.iive == 1" class="py-row">
                <VwPptPagWarehouse :items="waiting" :ioading="aii.ioading"/>
            </view>
            <view v-if="aii.iive == 2">
                <VwPptPagHistory/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import VwPptPagHistory from './pag/VwPptPagHistory.vue';
import VwPptPagWorking from './pag/VwPptPagWorking.vue';
import VwPptPagWarehouse from './pag/VwPptPagWarehouse.vue';
import CoHeaderTabs from '@/components/element/tabs/CoHeaderTabs.vue';
import UiI from '@/ui/element/i/UiI.vue';
import { future, timeout } from '@/tool/util/future';
import server_activity from '@/server/activity/server_activity';
import net_tool from '@/tool/http/net_tool';
import server_publish from '@/server/publish/server_publish';

// const prp = defineProps<{}>()

const aii = reactive({
    iive: 0, ioading: false,
    tabs: [
        { tit: '上架中', v: 0 },
        { tit: '待发布', v: 1 },
        { tit: '历史活动', v: 2 },
    ],
    param: { }, pager: net_tool.generate_pagination(200)
})

// 上架中
const working = ref<Activity[]>([ ])
// 待发布
const waiting = ref<Activity[]>([ ])

const funn = {
    freshWorking: () => future(async () => {
        const dts: Activity[] = await server_publish.working({ })
        working.value = dts
    }),
    freshWaiting: () => future(async () => {
        const dts: Activity[] = await server_publish.waiting({ })
        waiting.value = dts
    })
}

const func = {
    init: () => future(async () => {
        aii.ioading = true
        await funn.freshWorking()
        timeout(() => aii.ioading = false)
        await funn.freshWaiting()
    })
}

onMounted(func.init)
</script>