<template>
    <view class="px-row">
        <view :class="isphone ? '' : 'row'">
            <view class="pt-x1" v-for="(v, i) in activities" :key="i"
                :class="w_clazz">
                <CoMoIndexActivitySearchItem :v="v" :joins="joins" @view="funn.view"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoIndexActivitySearchItem from '@/components/modules/index/CoMoIndexActivitySearchItem.vue';
import CoMoOrderWorkingItem from '@/components/modules/order/CoMoOrderWorkingItem.vue';
import { acyReFresh, authState, orderState, uiGetters } from '@/memory/global';
import open_of_activity from '@/server/__func/open_of_activity';
import { future } from '@/tool/util/future';
import { computed } from 'vue';

const prp = defineProps<{
    activities: Activity[]
}>()

const joins = computed((): ActivityJoin[] => orderState.join_of_mine)

const funn = {
    view: (v: Activity) => future(async () => {
        open_of_activity.view(v)
    })
}

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>