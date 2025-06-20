<template>
    <view>
        <view class="px-row">
            <view class="pt-x1" v-for="(v, i) in activities" :key="i">
                <CoMoIndexActivitySearchItem :v="v" :joins="joins" @view="funn.view"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoIndexActivitySearchItem from '@/components/modules/index/CoMoIndexActivitySearchItem.vue';
import CoMoOrderWorkingItem from '@/components/modules/order/CoMoOrderWorkingItem.vue';
import { acyReFresh, authState, orderState } from '@/memory/global';
import Activity from '@/pages/activity/activity.vue';
import uniRouter from '@/tool/uni/uni-router';
import { future } from '@/tool/util/future';
import { computed } from 'vue';

const prp = defineProps<{
    activities: Activity[]
}>()

const joins = computed((): ActivityJoin[] => orderState.join_of_mine)

const funn = {
    view: (v: Activity) => future(async () => {
        acyReFresh('view', v);
        uniRouter.gopg('activity_detail');
    })
}
</script>