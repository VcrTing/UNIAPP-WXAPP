<template>
    <view>
        <view class="pt-x1 pb-x1 px-row fx-aii-btn-def">
            <view class="px-col h5 tit tils-x1 fw-550">
                {{ v.title }}
            </view>
        </view>
        <view class="pt-s pb px-row fx-aii-btn-def">
            <view class="px-col">
                <view class="row">
                    <view class="d-ib px-s"
                        v-for="(v, i) in tags" :key="i">
                        <OButtonTag color="def" class="fx-c py-t px-x2 br-s" :class="v.clazz">
                            <text class="fs-s">{{ v.name }}</text>
                        </OButtonTag>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import product_tool from '@/tool/modules/product_tool';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: Product, 
}>()

const tags = computed((): Tag[] => must_arr(prp.v.tags))
</script>