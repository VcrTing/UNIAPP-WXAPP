<template>
    <view class="">
        <view class="o-h">
            <view class="ps-r zi-t">
                <view class="ps-r zi-s">
                    <image mode="aspectFill" class="w-100 h-28vh" :src="one.banner"/>
                </view>
                <view class="abs-bi zi-n c-fff pi-row pb-x1">
                    <view class="h5 fw-550">{{ one.title }}</view>
                    <view class="pt">
                        {{ one.description }}
                    </view>
                </view>
            </view>
        </view>
        <!--
        <view class="bg-con">
            <view class="py-s px-row">
                <CoMoUserInfo :v="publisher"/>
            </view>
        </view>-->
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    item: OrderItem
}>()

const one = computed(() => must_one<ONE>(prp.item).one || mock_orders.items[0])
const tags = computed(() => must_arr(one.value.tags))
const publisher = computed(() => must_one<ONE>(one.value).publisher || { })
</script>