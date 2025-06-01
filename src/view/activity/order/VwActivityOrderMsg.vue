<template>
    <view class="">
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>下单日期</template>
            <template #r>&nbsp;2025-12-12 23:24</template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>代金金额</template>
            <template #r><text class="h6 err">&nbsp;0</text></template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>支付方式</template>
            <template #r>
                <view><text class="fs-w">微信支付</text></view>
            </template>
        </CoMoOrderMsgItem>
        <!--
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

const prp = defineProps<{
    item?: ONE
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const msg = computed(() => must_one<ONE>(prp.item).msg || { })
const assistant = computed(() => must_one<ONE>(prp.item).assistant || { })
</script>