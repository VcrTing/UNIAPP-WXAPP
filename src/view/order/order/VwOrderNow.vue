<template>
    <view>
        <view class="px-row pb">
            <view class="h5 fw-550">进行中</view>
        </view>
        <view class="py-row px-row mh-12em">
            <view v-if="orders.length > 0">
                <view class="pb" v-for="(v, i) in orders" :key="i">
                    <VwOrderNowItem :v="v"/>
                </view>
            </view>
            <CoEmpty v-else/>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import { orderState } from '@/memory/global';
import { must_arr } from '@/tool/util/valued';
import { computed, reactive } from 'vue';
import VwOrderNowItem from './item/VwOrderNowItem.vue';

const prp = defineProps<{
    order: ONE
}>()

const orders = computed(() => {
    return must_arr(orderState.orders_of_iive) || [ ]
})

const aii = reactive({
    
})
</script>

<style lang="sass">
.order-empty
    min-height: 8em
</style>