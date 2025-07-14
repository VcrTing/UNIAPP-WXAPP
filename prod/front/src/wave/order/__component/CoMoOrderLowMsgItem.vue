<template>
    <view>
        <view class="">
            <view class="fx-r px-row py-s fx-fcs-bg-def br-br br-bi c-p" @tap="emt('msg', v)">
                <view class="pi-s">
                    <CkSimpleTag :clazz="'btn-def fx-c px-s'">
                        <text class="fs-t tis">{{ times.fmts(v.createdAt) }}</text>
                    </CkSimpleTag>
                </view>
                <view class="pi-s">
                    <view v-if="order_tool.ispayed(v)">
                        <CkSimpleTag :clazz="'btn-def fx-c px-s'">
                            <text class="fs-t cos">已支付</text>
                        </CkSimpleTag>
                    </view>
                    <view v-else>
                        <CkSimpleTag :clazz="'btn-err fx-c px-s'">
                            <text class="fs-t ">未支付，点击查看订单号</text>
                        </CkSimpleTag>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import order_tool from '@/tool/modules/order_tool';
import times from '@/tool/web/times';

defineProps<{
    v: XOrder
}>()

const emt = defineEmits(['msg'])
</script>