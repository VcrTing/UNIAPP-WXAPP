<template>
    <view>
        <CoMoOrderJoinLen :joins="aii.hisotry"/>
        <view>
        <view class="px-row br">
            <CoViDataLoading :ioading="aii.ioading" :items="aii.hisotry">
                <!-- -->
                <view class="" :class="isphone ? '' : 'row'">
                    <view v-for="(v, i) in aii.hisotry" :key="i"
                        class="py"
                        :class="w_clazz"
                    >
                        <view class="card o-h">
                            <view class="pt pb-s px-x1 fx-aii-btn-def">
                                <view class="">
                                    <text class="h5 pr-s fw-600 coh tils-x1">{{ v.activity.title }}</text>
                                </view>
                            </view>
                            <view class="fx-i px-x1 fx-aii-btn-def py-s">
                                <view v-if="activity_tool.istyped_sm(v.activity)" class="sus d-ib fs-s pr">
                                    <UiI i="lock" clazz="d-ib"/><text class="pi-s">私密</text>
                                </view>
                                <view v-else class="sus d-ib fs-s pr"><text class="pi-s">公开类型</text></view>
                            </view>
                            <view v-if="v.consumeStatus == 1">

                            </view>
                            <view v-else class="">
                                <view class="px-x1 fs-n btn-def py-s">
                                    <text>{{ activity_tool.gettime_start(v.activity) }}开始，</text>
                                    <text>距离开始，还剩:</text>
                                    <text class="px-s">{{ activity_tool.getstarttime_remaining(v.activity) }}</text>
                                    <text v-if="times.remaining(null, v.activity.startTime) <= 0" class="err pi">(已逾期，未消费)</text>
                                </view>
                            </view>
                            <view class="tid">
                                <view class="px-x1 fx-aii-btn-def pb-n pt">
                                    <text class="pr-s">付款时间:</text>
                                    <text>{{ times.fmts(v.registrationTime) }}</text>
                                </view>
                                <view class="px-x1 fx-aii-btn-def py-n">
                                    <text class="pr-s">付款金额:</text>
                                    <CoMoney>{{ v.feeAmount }}</CoMoney>
                                </view>
                                <view class="px-x1 fx-aii-btn-def py-n">
                                    <text class="pr-s">票数:</text>
                                    <text>{{ v.num }}</text>
                                </view>
                            </view>
                            <view class="fx-s py-col pi-x1 pr fx-aii-btn-def">
                                <view class="tis">
                                    <text>{{ join_tool.getconsume_time(v) }}</text>
                                </view>
                                <view class="">
                                    <OButton v-if="v.refundStatus == 1" color="err" :weak="true" clazz="px-s py-t br-t fs-s">已退款</OButton>
                                    <view v-else>
                                        <OButton v-if="v.consumeStatus == 1" color="pri-iht" :weak="true" clazz="px-s py-t br-t fs-s">已消费</OButton>
                                        <OButton v-else color="err" :weak="true" clazz="px-s py-t br-t fs-s">待消费</OButton>
                                    </view>
                                </view>
                            </view>
                            <view class="" v-if="v.refundStatus == 1">
                                <view class="bg-def h-1 my"></view>
                                <view class="px-x1 fx-aii-btn-def py-s">
                                    <text class="pr-s">退款时间:</text>
                                    <text>{{ times.fmts(v.refundTime) }}</text>
                                </view>
                                <view class="px-x1 fx-aii-btn-def py-s">
                                    <text class="pr-s">退款金额:</text>
                                    <CoMoney>{{ v.refundPrice }}</CoMoney>
                                </view>
                                <view class="px-x1 fx-aii-btn-def pt-s pb">
                                    <text class="pr-s">退款理由:</text>
                                    <text>{{ v.refundRemark }}</text>
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
import CoMoney from '@/components/visual/money/CoMoney.vue';
import server_joining from '@/server/activity/server_joining';
import activity_tool from '@/tool/modules/activity_tool';
import join_tool from '@/tool/modules/join_tool';
import { futuring, promise } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';
import CoMoOrderJoinLen from './components/CoMoOrderJoinLen.vue';
import { uiGetters } from '@/memory/global';


const aii = reactive({
    ioading: false, hisotry: <ActivityJoin[]>[ ]
})

const funn = {
    fetching: () => futuring(aii, async () => {
        const ass: ActivityJoin[] = await server_joining.join_history()
        if (is_nice_arr(ass)) {
            console.log('我的参与历史 =', ass)
            aii.hisotry = ass
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>

<style lang="sass">
.pag-order-his-cont
    min-height: calc( 100vh - 34em )
</style>

                        <!--
                        <view class="abs-bi">
                            <view class="px-col pb-s">
                                <text class="c-fff">{{ v.title }}</text>
                            </view>
                        </view>
                        -->
                        <!--
                        <view class="pb-row px-col">
                            <view class="fx-s">
                                <CoMoUserInfoS :v="v.publisher"/>
                                <view class="fs-w">
                                    <OButtonIht :weak="true" clazz="fs-s px-s py-t">
                                        已完成
                                    </OButtonIht>
                                </view>
                            </view>
                        </view>
                        -->

                <!--
                <view class="bg-con br-x1 px-col py-col">
                    <view class="fx-s fx-t">
                        <view class="pr">
                            <CkAvatar :clazz="'w-3em h-3em'" :src="v.publisher.avatar"/>
                        </view>
                        <view class="fx-1">
                            <view class="fx-s fx-t">
                                <view class="fx-i">
                                    <view class="">
                                        <view class="pb-s">{{ v.publisher.name }}</view>
                                        <view class="fx-i fs-n">
                                            <view class="pr-s" v-for="(m, n) in v.publisher.usely" :k="n">
                                                {{ m.txt }}
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view>
                                    <OButtonIht :weak="true" :clazz="'px-s fs-n br-s'">已完成</OButtonIht>
                                </view>
                            </view>
                            <view class="pt-col">
                                <view>
                                    {{ v.title }}
                                </view>
                                <view class="pt">
                                    
                                </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view class="fx-s w-100">
                        </view>
                    </view>
                </view>
                -->