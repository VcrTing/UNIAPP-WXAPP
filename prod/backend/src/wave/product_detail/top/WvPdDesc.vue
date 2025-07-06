<template>
    <view class="">
        <view class="">
            <!--  -->
            <view class="pt pb mh-4em px-row fx-aii-btn-def-s" v-for="(v, i) in cons" :key="i">
                <view class="px-col">
                    {{ v }}
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import content_tool from '@/tool/modules/common/content_tool';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';

const prp = defineProps<{
    v: Product, sts: ONE
}>()

const cons = computed((): string[] => {
    const oo: ProductContent = must_one(prp.v)
    return content_tool.split_end( oo.introduction )
})
</script>