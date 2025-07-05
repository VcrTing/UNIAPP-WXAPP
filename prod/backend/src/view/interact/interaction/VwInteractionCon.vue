<template>
    <view class="py-row">
        <CoHeaderTabs :tabs="aii.tabs" @change="(i) => aii.iive = i"/>
        <view>
            <view v-if="aii.iive == 0">
                <VwIcMyApply />
            </view>
            <view v-if="aii.iive == 1">
                <VwIcMyRespond />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoHeaderTabs from '@/components/element/tabs/CoHeaderTabs.vue';
import { reactive } from 'vue';
import VwIcMyApply from './pag/VwIcMyApply.vue';
import VwIcMyRespond from './pag/VwIcMyRespond.vue';

const aii = reactive({
    iive: 0,
    tabs: [
        { tit: '我的邀请', v: 0 },
        { tit: '被邀请', v: 1 },
    ]
})
</script>