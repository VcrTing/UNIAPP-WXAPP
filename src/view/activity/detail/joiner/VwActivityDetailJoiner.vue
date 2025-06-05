<template>
    <view class="pt-s">
        
        <view class="fx-s pt pb">
            <view class="fx-i">
                <view class="">
                    <text class="fw-500">参与者&nbsp;</text>
                </view>
                <view class="sus fs-n">
                    <text>.&nbsp;{{ activity_tool.getjoiner_len(one) }}</text>
                    <text>人一起</text>
                </view>
            </view>
            <view class="fx-1 ta-r">
                <view class="pri fs-n">
                    <text>仅剩</text>
                    <text>{{ activity_tool.getjoin_remaining(one) }}</text>
                    <text>个名额</text>
                    <UiI clazz="d-ib" :i="'r'"/>
                </view>
            </view>
        </view>
        <view class="pb-col pt">
            <view class="fx-i pt-s">
                <view class="w-20" v-for="(v, i) in members" :key="i">
                    <CoMoActivityJoinerBlock :v="v"/>
                </view>
                <CoMoActivityJoinerBlockMore v-if="last" :user="last" clazz="w-20"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoMoActivityJoinerBlock from '@/components/modules/activity/CoMoActivityJoinerBlock.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import activity_tool from '@/tool/modules/activity_tool';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';
import CoMoActivityJoinerBlockMore from '../component/CoMoActivityJoinerBlockMore.vue';

const prp = defineProps<{
    one: Activity
}>()

const members = computed((): MANY => {
    const src = mock_meizi.items
    if (src && src.length >= 5) {
        return must_arr([
            src[0], src[1], src[2], src[3]
        ])
    }
    return src
})

const last = computed((): ONE | null => {
    const src = mock_meizi.items
    if (src && src.length >= 5) {
        // const res = src.splice(4, 5)
        return src[4]
    }
    return null
})
</script>