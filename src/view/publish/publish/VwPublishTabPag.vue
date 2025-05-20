<template>
    <view>
        <view class="fx-i zi-s">
            <view class="py-s" v-for="(v, i) in aii.tabs" :key="i"
                @tap="aii.iive = i"
                :class="aii.iive == i ? 'bd-b-x2 bd-c-x2' : 'sus'"
            >
                <view class="px py-row fx-c">
                    <view class="h6 fw-550">{{ v.tit }}</view>
                </view>
            </view>
        </view>
        <view class="zi-t bd-b w-100 bd-c-s tsf-y-100-r"></view>
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

// const prp = defineProps<{}>()

const aii = reactive({
    iive: 0,
    tabs: [
        { tit: '进行中', v: 0 },
        { tit: '活动仓库', v: 1 },
        { tit: '历史活动', v: 2 },
    ]
})
</script>