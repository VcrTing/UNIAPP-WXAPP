<template>
    <view>
        <view class="pb-col pt-x2">
            <text class="sus">活动描述</text>
        </view>
        <view class="pt-s">
            <view class="pt pb-x2 h7">
                {{ one.introduction ? one.introduction : one.title }}
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity
}>()

const contents = computed(() => {
    return mock_orders.content
})

const tags = computed((): ActivityTag[] => {
    return must_one<Activity>(prp.one).activity_tags || [ ]
})
</script>

            <!--
            <view v-for="(v, i) in contents" :key="i">
                <view class="py-s">{{ v.txt }}</view>
            </view>
            -->
            <!--
            <view class="pt-col"></view>
            <view class="pt-col">
                <view class="d-ib pr pb" v-for="(v, i) in tags" :key="i">
                    <view class="btn bg-hui-x1 br-s px-s tit">{{ v.txt }}</view>
                </view>
            </view>-->