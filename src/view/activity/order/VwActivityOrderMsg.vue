<template>
    <view class="">
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>下单日期</template>
            <template #r>{{ msg.createTime }}&nbsp;</template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>代金券</template>
            <template #r>无&nbsp;</template>
        </CoMoOrderMsgItem>
        <CoMoOrderMsgItem :clazz_r="'py'">
            <template #i>付款金额</template>
            <template #r>
                <view class="fw-550 money">￥&nbsp;<text class="fw-800 h7">990.00</text></view>
            </template>
        </CoMoOrderMsgItem>
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