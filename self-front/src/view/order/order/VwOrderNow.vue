<template>
    <view>
        <view class="">
            <CoMoOrderJoinLen :joins="joins"/>
        </view>
        <view>
        <view class="" :class="isphone ? '' : 'row'">
            <!-- -->
            <view v-for="(v, i) in joins" :key="i"
                class="py"
                :class="w_clazz"
            >
                <CoMoOrderWorkingItem :v="funn.ioc(v)" @view="funn.view"/>
                <view class="px-row">
                    <view class="card o-h">
                        <view class="px-x1 pb pt-x1 fx-aii-btn-def"><text class="header-s">订单明细</text></view>
                        <view class="">
                            <view>
                                <CoMoOrderMsgItem :clazz="'py-n'">
                                    <template #i>报名时间</template>
                                    <template #r><view class="">{{ times.fmts(v.registrationTime) }}</view></template>
                                </CoMoOrderMsgItem>
                                <CoMoOrderMsgItem :clazz="'py-n'">
                                    <template #i>付款金额</template>
                                    <template #r><CoMoney>{{ v.feeAmount }}</CoMoney></template>
                                </CoMoOrderMsgItem>
                                <CoMoOrderMsgItem :clazz="'py-n'">
                                    <template #i>订购票数</template>
                                    <template #r><view class="h7">{{ v.num }}</view></template>
                                </CoMoOrderMsgItem>
                            </view>
                        </view>
                        <view class="pt pb-s fx-aii-btn-def">
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
import { acyReFresh, uiGetters } from '@/memory/global';
import { open_of_net } from '@/server/__func/open_of_net';
import { tiperr, tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { future, futuring } from '@/tool/util/future';
import { arrfindi } from '@/tool/util/iodash';
import { must_arr, must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import CoMoOrderJoinLen from './components/CoMoOrderJoinLen.vue';
import { computed } from 'vue';
const prp = defineProps<{
    joins: ActivityJoin[ ],
    activities: Activity[ ]
}>()

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
        
    },
    view: (v: Activity) => future(async () => {
        const res: Activity = await open_of_net('activity', v.documentId)
        if (res && res.documentId) {
            acyReFresh('view', res);
            uniRouter.gopg('activity_detail');
        }
        else {
            tipwarn('查询数据失败，可能是网络波动。')
        }
    })
}

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>