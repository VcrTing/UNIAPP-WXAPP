<template>
    <view class="pt-s">
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>下单日期</template>
            <template #r>&nbsp;{{ times.fmts(null) }}</template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>付款金额</template>
            <template #r>
                <view class="h8 err fx-r">&nbsp;
                    <text>￥</text>
                    <text class="h6 fw-550 pi-t">{{ one.fee }}</text>
                    <!--
                    <text class="pi" v-if="one.fee <= 0">免费</text>
                    -->
                </view>
            </template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>代金金额</template>
            <template #r>
                <view class="h9 tis fx-r">&nbsp;
                    <text>￥</text>
                    <text class="h7 fw-550 pi-t">0</text>
                </view>
            </template>
        </CoMoOrderMsgItem>
        <!--
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>支付方式</template>
            <template #r>
                <view><text class="fs-w">微信支付</text></view>
            </template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>付款金额</template>
            <template #r>
                <view class="fw-550 err">￥&nbsp;<text class="fw-550 h7">69.00</text></view>
            </template>
        </CoMoOrderMsgItem>
        -->
    </view>
</template>

<script setup lang="ts">
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoOrderMsgItem from '@/components/modules/order/CoMoOrderMsgItem.vue';
import times from '@/tool/web/times';

const prp = defineProps<{
    item: OrderItem
}>()

const one = computed((): Activity => must_one<OrderItem>(prp.item).one)
</script>