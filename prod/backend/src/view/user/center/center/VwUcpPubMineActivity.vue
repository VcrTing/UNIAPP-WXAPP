<template>
    <view class="pt-row">
        <view v-for="(j, k) in items" :key="k">
            <view class="px-row pb-row">
                <CoMoUserActivityItem :v="j" :meizi="meizi"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoUserActivityItem from '@/components/modules/activity/CoMoUserActivityItem.vue';
import CoMoIndexActivityItem from '@/components/modules/index/CoMoIndexActivityItem.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';

// const prp = defineProps<{}>()

const items = mock_orders.items

const meizi = mock_meizi.items
</script>