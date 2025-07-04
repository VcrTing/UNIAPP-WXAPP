<template>
    <view v-if="!sts.is_buyed">
        <view class="pt pb px-row fx-aii-btn-def" v-if="p">
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
                    <view class="px-s fs-n">
                        <CkSimpleTag>包邮</CkSimpleTag>
                    </view>
                </view>
                <view class="row">
                    <view class="cos">
                        <CkSimpleTag>
                            <text class="fs-w">{{ product_tool.getnum_view(v) }}</text>
                            <text class="fs-n">浏览</text>
                        </CkSimpleTag>
                    </view>
                    <text></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkDefTag from '@/cake/visual/tag/CkDefTag.vue';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';
import product_tool from '@/tool/modules/product_tool';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: Product, sts: ONE
}>()

const honours = computed((): Tag[] => product_tool.gethonours(prp.v))

const p = computed((): number => product_tool.getprice(prp.v))
const p_less = computed((): number => product_tool.getprice_less(prp.v))
</script>