<template>
    <view>
        <view class="bg-con">
            <view class="fx-s zi-s">
                <view class="fx-i fx-1">
                    <view class="py-s ts bd-b-x2 fx-aii-btn-def c-p" v-for="(v, i) in aii.tabs" :key="i"
                        @tap="funn.swicthTab(i)"
                        :class="aii.iive == i ? ' bd-c-x2' : 'sus'"
                    >
                        <view class="px-row py fx-c softer">
                            <view class="h6 fw-550">{{ v.name }}</view>
                        </view>
                    </view>
                </view>
                <view class="">
                    <!-- -->
                </view>
            </view>
            <view class="zi-t bd-b w-100 bd-c-s "></view>
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
import { onMounted, reactive, ref, watch } from 'vue';
import VwPptPagHistory from './pag/VwPptPagHistory.vue';
import VwPptPagWorking from './pag/VwPptPagWorking.vue';
import VwPptPagWarehouse from './pag/VwPptPagWarehouse.vue';
import { future, timeout } from '@/tool/util/future';
import net_tool from '@/tool/http/net_tool';
import server_publish from '@/server/publish/server_publish';

const prp = defineProps<{
    route: PUBLISH_PAGE_ROUTE
}>()

const aii = reactive({
    iive: prp.route.pag || 0, ioading: false,
    tabs: [
        { name: '上架中', v: 0 },
        { name: '待发布', v: 1 },
        { name: '已下架', v: 2 },
    ],
    param: { }, pager: net_tool.__pager_long()
})

// 上架中
const working = ref<Product[]>([ ])
// 待发布
const waiting = ref<Product[]>([ ])

const funn = {
    freshWorking: () => future(async () => {
        const dts: Product[] = await server_publish.working({ })
        working.value = dts
    }),
    freshWaiting: () => future(async () => {
        const dts: Product[] = await server_publish.waiting({ })
        waiting.value = dts
    }),
    swicthTab: (i: number) => {
        aii.iive = i
        if (i == 1) {
            funn.freshWaiting()
        }
        else if (i == 0) {
            funn.freshWorking()
        }
    }
}

defineExpose(funn)

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