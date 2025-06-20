<template>
    <view>
        <view>
        <view class="px-row br pt-row">
            <!-- -->
            <view v-for="(v, i) in aii.hisotry" :key="i"
                class="pt-x1"
            >
                <view class="card o-h">
                    <view class="py px-x1 fx-aii-btn-def">
                        <view class="">
                            <text class="h5 pr-s fw-600 coh tils-x1">{{ v.activity.title }}</text>
                        </view>
                    </view>
                    <view class="fx-i px-x1 fx-aii-btn-def" v-if="activity_tool.istyped_sm(v.activity)">
                        <view class="sus d-ib fs-s pr"><UiI i="lock" clazz="d-ib"/><text class="pi-s">私密</text></view>
                        <!--<view class="sus fx-i fs-s">
                            <UiI i="addr" /><text class="pi-s">{{ activity_tool.getaddress(v.activity) }}</text>
                        </view>-->
                    </view>
                    <view v-if="v.consumeStatus == 1"></view>
                    <view v-else class="fx-aii-btn-def py-s">
                        <view class="px-x1 fs-n btn-def py-s">
                            <text>距离开始，还剩:</text>
                            <text class="px-s">{{ activity_tool.getstarttime_remaining(v.activity) }}</text>
                            <text v-if="times.remaining(null, v.activity.startTime) <= 0" class="err pi">(已逾期，未消费)</text>
                        </view>
                    </view>
                    <view class="tid pt-s">
                        <view class="px-x1 fx-aii-btn-def py-n">
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

            <!--
            <view class="fx-c py-row">
                <view class="sus fx-c">
                    <view>查看更多</view>
                    <view><UiI :i="'r'"/> </view>
                </view>
            </view>
            -->
        </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import CoMoUserInfoS from '@/components/modules/user/CoMoUserInfoS.vue';
import CoMoney from '@/components/visual/money/CoMoney.vue';
import server_activity from '@/server/activity/server_activity';
import server_joining from '@/server/activity/server_joining';
import mock_orders from '@/server/mock/order/mock_orders';
import activity_tool from '@/tool/modules/activity_tool';
import join_tool from '@/tool/modules/join_tool';
import { futuring, promise } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { getgallery } from '@/tool/view/view_media';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';

const datas = computed((): MANY => {
    const src = mock_orders.items || [ ]
    if (src && src.length) {
        return [ src[0], src[1], src[2] ]
    }
    return src;
})

const aii = reactive({
    ioading: false, hisotry: <ActivityJoin[]>[ ]
})

const funn = {
    fetching: () => futuring(aii, async () => {
        const ass: ActivityJoin[] = await server_joining.join_history()
        console.log('我的参与历史 =', ass)
        if (ass) {
            aii.hisotry = ass
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)
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