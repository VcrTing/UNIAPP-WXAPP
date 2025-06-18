<template>
    <view>
        
        <view>
        <view class="">
            <!-- -->
            <view v-for="(v, i) in joins" :key="i"
                class="pb-x1 px-row"
            >
                <CoMoOrderWorkingItem :v="funn.ioc(v)"/>
                <view>
                    <view class="card py-col">
                        <view class="px-x1 py"><text class="header-s">订单明细</text></view>
                        <view class="">
                            <view>
                                <CoMoOrderMsgItem :clazz="'py-s'">
                                    <template #i>报名时间</template>
                                    <template #r><view class="">{{ times.fmts(v.registrationTime) }}</view></template>
                                </CoMoOrderMsgItem>
                                <CoMoOrderMsgItem :clazz="'py-s'">
                                    <template #i>付款金额</template>
                                    <template #r><CoMoney>{{ v.feeAmount }}</CoMoney></template>
                                </CoMoOrderMsgItem>
                                <CoMoOrderMsgItem :clazz="'py-s'">
                                    <template #i>订购票数</template>
                                    <template #r><view class="h7">{{ v.num }}</view></template>
                                </CoMoOrderMsgItem>
                            </view>
                        </view>
                        <view class="pt pb-s">
                            <view class="fx-s px-x1">
                                <view></view>
                                <OButton color="pri-iht" :weak="true" clazz="px py-s br-s">
                                    <UiI i="scan" clazz="d-ib"/>
                                    <text class="pi-s">点子票/核销码</text>
                                </OButton>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

        </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoMoOrderMsgItem from '@/components/modules/order/CoMoOrderMsgItem.vue';
import CoMoOrderWorkingItem from '@/components/modules/order/CoMoOrderWorkingItem.vue';
import CoMoney from '@/components/visual/money/CoMoney.vue';
import activity_tool from '@/tool/modules/activity_tool';
import uniRouter from '@/tool/uni/uni-router';
import { arrfindi } from '@/tool/util/iodash';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    joins: ActivityJoin[ ],
    activities: Activity[ ]
}>()

/*
const datas = computed((): MANY => {
    const src = mock_orders.items || [ ]
    if (src && src.length) {
        return [ src[1] ]
    }
    return src;
})

const meizi = mock_meizi.items
*/

const funn = {
    ioc: (v: ActivityJoin): Activity => {
        let src = <Activity>{ }
        const act: Activity = must_one<Activity>(v.activity)
        if (act.documentId) {
            const acts: Activity[ ] = prp.activities || [ ]
            const i: number = arrfindi(acts, act.documentId, 'documentId')
            if (i >= 0) { src = acts[i] }
        }
        else {
            src = act
        }
        return src;
    },
    code: () => {
        
    }
}
</script>

            <!--
            <view class="pt-s px-col">
                <view class="fx-s">
                    <view class="fx-i fx-1 money fw-700">
                        <text class="h5">3.00&nbsp;&nbsp;</text>
                        <text>元 报名费</text>
                    </view>
                    <view>
                        <OButtonOut @tap="funn.detail(v)" :clazz="'fw-550 mw-5em mh-btn'">详情</OButtonOut>
                    </view>
                </view>
            </view>
            -->