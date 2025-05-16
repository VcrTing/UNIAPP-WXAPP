<template>
    <view class="">
        <view class="o-h">
            <view class="ps-r zi-t">
                <view class="ps-r zi-s">
                    <image mode="aspectFill" class="w-100 h-24vh" :src="one.banner"/>
                </view>
                <view class="abs-bi zi-n c-fff pi-row py-row">
                    <view class="h5 fw-550">{{ one.title }}</view>
                    <view class="pt-s">
                        {{ one.description }}
                    </view>
                </view>
            </view>
        </view>
        <view class="bg-con">
            <view class="py-s">
                <view class="pi-row fx-i">
                    <view class="fs-n">
                        <CkAvatar clazz="w-3em h-3em" :src="publisher.avatar"/>
                    </view>
                    <view class="fx-1 pi">
                        <view>{{ publisher.name }}</view>
                        <view>
                            {{  }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="pt-row"></view>
        <view class="bg-con br o-h">
            <view class="fx-c py fx-b">
                <view class="h4 fx-c fw-800 pri">
                    <text class="h3">120</text>
                    <text class="pi-s">分钟</text>
                </view>
                <view class="pi pri">后开始</view>
            </view>
            <view>
                <image mode="aspectFill" class="w-100 h-24vh" :src="mock_orders.mapimg"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    item: OrderItem
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const tags = computed(() => must_arr(one.value.tags))
const publisher = computed(() => must_one<ONE>(one.value).publisher || { })
</script>