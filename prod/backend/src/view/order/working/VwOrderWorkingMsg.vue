<template>
    <view class="">
        <view class="bg-con br-bi br-br pr-row pt-row">
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>活动标签</template>
                <template #r>
                    <view class="w-100 fx-i">
                        <OButton color="def" :weak="true" clazz="fs-n br-s px-s mr">黑丝</OButton>
                        <OButton color="def" :weak="true" clazz="fs-n br-s px-s mr">JK</OButton>
                        <OButton color="def" :weak="true" clazz="fs-n br-s px-s mr">约会</OButton>
                        <OButton color="def" :weak="true" clazz="fs-n br-s px-s">台球助教</OButton>
                    </view>
                </template>
            </CoMoOrderMsgItem>
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>发布者</template>
                <template #r>
                    <view class="w-100 fx-i">
                        <CkAvatar clazz="w-2em h-2em" :id="publisher.id" :src="publisher.avatar"/>
                        <!--
                        <view class="px">
                            {{ publisher.name }}
                        </view>-->
                    </view>
                </template>
            </CoMoOrderMsgItem>
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>付款金额</template>
                <template #r>
                    <view class="fw-550 money">￥&nbsp;<text class="fw-800 h7">700.00</text></view>
                </template>
            </CoMoOrderMsgItem>
        </view>
    </view>
</template>

<script setup lang="ts">
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoOrderMsgItem from '@/components/modules/order/CoMoOrderMsgItem.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';

const prp = defineProps<{
    item?: ONE
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const msg = computed(() => must_one<ONE>(prp.item).msg || { })
const publisher = computed(() => must_one<ONE>(one.value).publisher || mock_meizi.items[0])
const assistant = computed(() => must_one<ONE>(prp.item).assistant || { })
</script>