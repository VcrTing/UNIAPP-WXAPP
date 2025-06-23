<template>
    <view>
        <CoMoAdHeader>活动描述</CoMoAdHeader>
        <view class="pt-s pb coh">
            <view class="py-s px-row" v-for="(v, i) in contents" :key="i">
                <view class="px-col">
                    {{ v }}
                </view>
                <!--
                {{ one.introduction ? one.introduction : one.title }}
                -->
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import mock_orders from '@/server/mock/order/mock_orders';
import { is_nice_sn, must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoAdHeader from './component/CoMoAdHeader.vue';

const prp = defineProps<{
    one: Activity
}>()

const contents = computed((): string[] => {
    const src = prp.one.introduction ? prp.one.introduction : prp.one.title
    const res = <string[]>[ ]
    if (is_nice_sn(src)) {
        const st = src.split('。')
        must_arr(st).map((e: string) => {
            if (e) {
                res.push(e + '。')
            }
        })
    }
    return res
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