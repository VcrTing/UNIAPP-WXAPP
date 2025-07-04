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
                                            <text>{{v.feeAmount}}</text>
                                        </text>
                                    </view>
                                    <view class="fx-aii-btn-def pt-s pb px-x2">
                                        <view class="tiw">
                                            您参加了《{{ v.activity.title }}》活动，购票数 {{ v.num }} 张，每张 {{ v.price || 0 }} 元。
                                        </view>
                                    </view>
                                    <view class="">
                                        <view class="bg-hr h-1"></view>
                                    </view>
                                    <view class="fx-aii-btn-def py-s px-x2 fx-r fs-n">
                                        <text class="sus">{{ times.fmts(v.registrationTime) }}</text>
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
import OButton from '@/cake/button/OButton.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { uiGetters } from '@/memory/global';
import server_joining from '@/server/activity/server_joining';
import mock_msg from '@/server/mock/msg/mock_msg';
import { futuring, promise } from '@/tool/util/future';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
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
    records: <ActivityJoin[]> [ ]
})

const funn = {
    fetching: () => futuring(aii, async () => {
        const us: ActivityJoin[] = await server_joining.join_for_money()
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