<template>
    <view class="fx-s pt-x2 pb-col fx-aii-btn-def px-row">
        <view class="fx-i pi-col">
            <view class="">
                <text class="fw-500">邀请对象&nbsp;</text>
            </view>
            <view class="sus fs-n">
                <text>.&nbsp;{{ activity_tool.getjoiner_len(one) }}</text>
                <text>人</text>
            </view>
        </view>
        <view class="fx-1 ta-r" @tap="emt('go')">
            <view class="pri fs-n">
                <text>还可邀请</text>
                <text class="px-s">{{ activity_tool.getjoin_limit(one) - invites.length }}</text>
                <text>人</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import activity_tool from '@/tool/modules/activity_tool';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity,
    invites: ActivityInvite[ ]
}>()

const issm = computed((): boolean => activity_tool.istyped_sm(prp.one))

const emt = defineEmits([ 'go' ])
</script>