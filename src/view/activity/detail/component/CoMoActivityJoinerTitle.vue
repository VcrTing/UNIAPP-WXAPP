<template>
    <view class="fx-s pt-x2 pb-col fx-aii-btn-def px-row">
        <view class="fx-i pi-col">
            <view class="">
                <text class="fw-500">参与者&nbsp;</text>
            </view>
            <view class="sus fs-n">
                <text>.&nbsp;{{ activity_tool.getjoiner_len(one) }}</text>
                <text>人</text>
                <text v-if="!issm">一起</text>
            </view>
        </view>
        <view class="fx-1 ta-r">
            <view class="pri fs-n" v-if="issm">
                <text>可邀请</text>
                <text>{{ activity_tool.getjoiner_len(one) }}</text>
                <text>/</text>
                <text>{{ activity_tool.getjoin_limit(one) }}</text>
                <text>人组团</text>
            </view>
            <view class="pri fs-n" v-else>
                <text>仅剩</text>
                <text>{{ activity_tool.getjoin_remaining(one) }}</text>
                <text>个名额</text>
                <UiI clazz="d-ib" :i="'r'"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import activity_tool from '@/tool/modules/activity_tool';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity
}>()

const issm = computed((): boolean => activity_tool.istyped_sm(prp.one))
</script>