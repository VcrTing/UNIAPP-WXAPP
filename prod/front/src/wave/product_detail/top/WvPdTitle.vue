<template>
    <view>
        <view class="pt-x1 pb-x1 px-row fx-aii-btn-def">
            <view class="px-col h5 tit tils-x1 fw-550">
                {{ v.title }}
            </view>
        </view>
        <!--
        <view class="pt-s pb px-row fx-aii-btn-def">
            <view class="px-col">
                <view class="row">
                    <view class="d-ib px-s"
                        v-for="(v, i) in honours" :key="i">
                        <view class="fx-c py-t px br-s" :class="v.clazz">
                            <text class="fs-s">{{ v.name }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        -->
    </view>
</template>

<script setup lang="ts">
import product_tool from '@/tool/modules/product_tool';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: Product, 
}>()

const honours = computed((): Tag[] => product_tool.gethonours(prp.v))
</script>