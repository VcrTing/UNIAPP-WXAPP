<template>
    <view class="pt-s">
        <view class="px-row py-row">     
            
            <view class="" >
                <CoViDataLoading :ioading="aii.ioading" :items="aii.records">
                    <view class="ani-fade-b" :class="isphone ? '' : 'row'">
                        <view class="py-s" v-for="(v, i) in aii.records" :key="i"
                            :class="w_clazz"
                        >
                            <view class="card o-h">
                                <view class="">
                                    <view class="fx-aii-btn-def pt pb-s px-x2">
                                        <text :class="'err'" class="h4 fw-550">
                                            <!--
                                            <text v-if="v.isAdd">+</text>
                                            <text v-else>-</text>
                                            -->
                                            <text>-&nbsp;</text>
                                            <text>{{v.price}}</text>
                                        </text>
                                    </view>
                                    <view class="fx-aii-btn-def pt-s pb px-x2">
                                        <view class="tiw">
                                            您在订单{{ v.documentId }}中，成功支付了{{ v.price }}元。感谢您对本站的支持。
                                        </view>
                                    </view>
                                    <view class="">
                                        <view class="bg-hr h-1"></view>
                                    </view>
                                    <view class="fx-aii-btn-def py-s px-x2 fx-r fs-n">
                                        <text class="sus">{{ times.fmts(v.payTime || v.createdAt) }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </CoViDataLoading>
            </view>
            
        </view>
    </view>
</template>

<script setup lang="ts">
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { uiGetters } from '@/memory/global';
import server_order from '@/server/order/server_order';
import net_tool from '@/tool/http/net_tool';
import { futuring, promise } from '@/tool/util/future';
import times from '@/tool/web/times';
import { computed, nextTick, reactive } from 'vue';

// const prp = defineProps<{}>()

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})

const aii = reactive({
    i: 0, ioading: false,
    records: <XOrder[]> [ ],
    param: { }, pager: net_tool.__pager_long()
})

const funn = {
    fetching: () => futuring(aii, async () => {
        const us: XOrder[] = await server_order.payed(aii.param, aii.pager)
        if (us && us.length) {
            aii.records = us
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)
</script>