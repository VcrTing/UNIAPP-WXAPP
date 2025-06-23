<template>
    <view>
        <view class="pt pb-s px-row fx-aii-btn-def">
            <view class="px-col h5 tit tils-x1 fw-550">
                {{ one.title }}
            </view>
        </view>
        <view class="pt-s pb px-row fx-aii-btn-def">
            <view v-if="issm" class="d-ib px-col ">
                <view class="btn-pink fx-c py-t pi-s pr-t br-s">
                    <UiI clazz="fs-n" :i="'lock'"/>
                    <view class="fs-s fw-800">非公开类型活动</view>
                </view>
            </view>
            <view class="d-ib px-col " v-else>
                <view class="btn-blue fx-c py-t pi-s pr-t br-s">
                    <view class="fs-s fw-800">自动退</view>
                    <UiI clazz="fs-n" :i="'r'"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import activity_tool from '@/tool/modules/activity_tool';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity, issm: boolean
}>()


</script>