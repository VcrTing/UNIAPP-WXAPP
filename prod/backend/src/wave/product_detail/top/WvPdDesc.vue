<template>
    <view v-if="sts.is_buyed" class="">
        <view class="fx-aii-btn-def px-row">
            <view class="d-ib px-col pb">
                <OButtonTag color="blue" clazz="px-s br-1 fx-c"><text class="fs-s">已购</text></OButtonTag>
            </view>
        </view>
    </view>
    <view class="" v-else>
        <CoMoPdHeader>介绍</CoMoPdHeader>
        <view class="">
            <!--  -->
            <view class="pt pb mh-4em px-row fx-aii-btn-def-s" v-for="(v, i) in cons" :key="i">
                <view class="px-col">
                    {{ v }}
                </view>
            </view>
        </view>
        <!--
        <view class="px-row pb-s pt">
            <view class="px-col fs-s tiw fx-r row">
                <view>
                    <CkSimpleTag>发布于</CkSimpleTag>
                    <CkSimpleTag class="px-s">{{ times.fmts(v.createdAt) }}</CkSimpleTag>
                </view>
            </view>
        </view>
        -->
    </view>
</template>

<script setup lang="ts">
import content_tool from '@/tool/modules/common/content_tool';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoPdHeader from '../__component/CoMoPdHeader.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import times from '@/tool/web/times';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';

const prp = defineProps<{
    v: Product, sts: ONE
}>()

const cons = computed((): string[] => {
    const oo: ProductContent = must_one(prp.v)
    return content_tool.split_end( oo.introduction )
})
</script>