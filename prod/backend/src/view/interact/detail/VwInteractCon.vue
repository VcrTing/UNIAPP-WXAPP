<template>
    <view>
        <view>
            <view class="d-ib">
                <view class="fx-i">
                    <view class="fx-aii-btn-def px-row py-x2"
                        @tap="aii.iive = 0"
                    >
                        <view class="h6 b" :class="aii.iive == 0 ? '' : 'sus'">详情</view>
                    </view>
                    <view class="fx-aii-btn-def px-row py-x2"
                        @tap="aii.iive = 1"
                    >
                        <view class="h6 b" :class="aii.iive == 1 ? '' : 'sus'">活动地址</view>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="aii.iive == 0">
            <VwInteractConInfo :item="item" :tags="tags"/>
        </view>
        <view v-else-if="aii.iive == 1">
            <VwInteractConMap :item="item"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import mock_interact from '@/server/mock/interact/mock_interact';
import mock_tags from '@/server/mock/publish/mock_tags';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';
import VwInteractConInfo from './pag/VwInteractConInfo.vue';
import VwInteractConMap from './pag/VwInteractConMap.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    iive: 0
})

const item = computed(() => {
    return mock_interact.items[0]
})

const tags = computed(() => {
    return mock_tags.interact
})
</script>