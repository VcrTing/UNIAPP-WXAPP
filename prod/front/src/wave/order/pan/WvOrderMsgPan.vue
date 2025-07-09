<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'t'">
            
            <view class="btn-succ ta-c py">
                <view class="h7 py-s">订单号</view>
                <view class="pt pb-s">{{ v.documentId }}</view>
            </view>
            <view class="py">
                <CoMoOrderMsgLine :tit="'订单状态'">
                    <view v-if="order_tool.ispayed(v)">
                        <OButtonTag color="pri" clazz="br-1 px-s fs-s fx-c py-t">已支付</OButtonTag>
                    </view>
                    <view v-if="!order_tool.ispayed(v)">
                        <OButtonTag color="err" clazz="br-1 px-s fs-s fx-c py-t">未付款</OButtonTag>
                    </view>
                </CoMoOrderMsgLine>
                <CoMoOrderMsgLine :tit="'下单数量'">
                    {{ v.num }}
                </CoMoOrderMsgLine>
                <CoMoOrderMsgLine :tit="'付款金额'">
                    <CoMoney>{{ v.price }}</CoMoney>
                </CoMoOrderMsgLine>
                <CoMoOrderMsgLine :tit="'下单日期'">
                    {{ times.fmts(v.createdAt) }}
                </CoMoOrderMsgLine>
            </view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoMoOrderMsgLine from '../__component/block/CoMoOrderMsgLine.vue';
import times from '@/tool/web/times';
import OButton from '@/cake/button/OButton.vue';
import CoMoney from '@/components/visual/money/CoMoney.vue';
import order_tool from '@/tool/modules/order_tool';
import OButtonTag from '@/cake/button/OButtonTag.vue';

const prp = defineProps<{
    idx: number, v: XOrder
}>()

</script>