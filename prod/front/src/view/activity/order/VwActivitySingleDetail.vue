<template>
    <view>
        <!--
        <view class="header-s pb pt-s">
            项目信息&nbsp;
        </view>
        -->
        <view>
            <view class="fx-s fx-t">
                <image class="w-7em h-5em br-s" mode="aspectFill" :src="one.banner"/>
                <view class="fx-1 pi pr-s">
                    <view class="pt-s">
                        <text class="h6">{{ one.title }}</text>
                    </view>
                    <view class="fx-s pt">
                        <view class="fx-1">
                            <view class="fx-i">
                                <UiI class="" :i="'addr'"/>
                                <view class=" pi-s">
                                    {{ one.addr.address }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="pt">
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>活动时间</template>
                <template #r>
                    <text class="fs-w">{{ timed.startText }}</text>
                </template>
            </CoMoOrderMsgItem>
            <!--
            <CoMoOrderMsgItem>
                <template #i>主理人</template>
                <template #r>
                    <CkAvatar clazz="h7 w-2em h-2em" :src="publisher.avatar"/>
                </template>
            </CoMoOrderMsgItem>-->
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>报名费</template>
                <template #r>
                    <view class="err h6">
                        <text>￥</text>
                        <text>69.00</text>
                    </view>
                </template>
            </CoMoOrderMsgItem>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoOrderMsgItem from '@/components/modules/order/CoMoOrderMsgItem.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import UiI from '@/ui/element/i/UiI.vue';
import mock_orders from '@/server/mock/order/mock_orders';

// const prp = defineProps<{}>()

const prp = defineProps<{
    item: ONE
}>()

const one = computed((): ONE => must_one<ONE>(prp.item).one || mock_orders.items[0])
const addr = computed((): ONE => must_one<ONE>(one.value).addr || { })
const timed = computed((): ONE => must_one<ONE>(one.value).timed || { })
const publisher = computed((): ONE => must_one<ONE>(one.value).publisher || { })
</script>