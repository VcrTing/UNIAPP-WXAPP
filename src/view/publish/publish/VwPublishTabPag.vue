<template>
    <view>
        <view class="bg-con">
            <CoHeaderTabs :tabs="aii.tabs" @change="(i) => aii.iive = i"/>
        </view>
        <view>
            <view v-if="aii.iive == 0" class="py-row">
                <VwPptPagWorking/>
            </view>
            <view v-if="aii.iive == 1" class="py-row">
                <VwPptPagWarehouse/>
            </view>
            <view v-if="aii.iive == 2">
                <VwPptPagHistory/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import VwPptPagHistory from './pag/VwPptPagHistory.vue';
import VwPptPagWorking from './pag/VwPptPagWorking.vue';
import VwPptPagWarehouse from './pag/VwPptPagWarehouse.vue';
import CoHeaderTabs from '@/components/element/tabs/CoHeaderTabs.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    iive: 0,
    tabs: [
        { tit: '上架中', v: 0 },
        { tit: '待发布', v: 1 },
        { tit: '历史活动', v: 2 },
    ]
})
</script>