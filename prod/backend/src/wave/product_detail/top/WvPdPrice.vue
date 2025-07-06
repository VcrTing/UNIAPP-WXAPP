<template>
    <view >
        <view class="pt pb px-row fx-aii-btn-def">
            <view class="fx-s px-col fx-b">
                <view class="fx-i fx-b row">
                    <view class="money">
                        <CkSimpleTag>
                            <text>￥</text>
                            <text class="h3 fw-700">{{ p }}</text>
                        </CkSimpleTag>
                    </view>
                    <view class="fs-n tiw td-lt">
                        <CkSimpleTag>
                            <text class="td-lt">￥</text>
                            <text class="td-lt">{{ p_less }}</text>
                        </CkSimpleTag>
                    </view>
                    <view class="px fs-n fx-i">
                        <view v-if="product_tool.show_inv_many(v)"><text>库存剩余:</text><text class="px-s">{{ v.inv }}</text></view>
                        <view v-else>
                            <view v-if="product_tool.is_inv_infini(v)">库存{{ DATA_PRODUCT_TYPED_INV_INFINI.name }}</view>
                            <view v-if="product_tool.is_inv_alone(v)">{{ DATA_PRODUCT_TYPED_INV_ALONE.name }}</view>
                        </view>
                    </view>
                </view>
                <view class="row">
                    <view class="tiw fx-r">
                        <CkSimpleTag>
                            <text class="fs-w">{{ product_tool.getnum_view(v) }}</text>
                            <text class="fs-n">浏览</text>
                        </CkSimpleTag>
                        <view class="pi-s">
                            <CkSimpleTag>
                                <text class="fs-w">{{ product_tool.getnum_sell_txt(v) }}</text>
                            </CkSimpleTag>
                        </view>
                    </view>
                    <text></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import { DATA_PRODUCT_TYPED_INV_ALONE, DATA_PRODUCT_TYPED_INV_INFINI } from '@/conf/conf-datas';
import product_tool from '@/tool/modules/product_tool';
import { computed } from 'vue';

const prp = defineProps<{
    v: Product, sts: ONE, is_publisher: boolean
}>()

const honours = computed((): Tag[] => product_tool.gethonours(prp.v))

const p = computed((): number => product_tool.getprice(prp.v))
const p_less = computed((): number => product_tool.getprice_less(prp.v))
</script>