<template>
    <view>
        <view v-if="show" class="py-row btn-err softer">
            <view class="px-inp" v-if="product_tool.is_review_no(edit)">
                <view class="h7 pb">审核不通过</view>
                <view>审核意见:&nbsp;&nbsp;{{ reviewComment || '检查内容是否合规格。' }}</view>
            </view>
            <view class="px-inp" v-else>
                <view class="h7 pb">提醒</view>
                <view>您提交的活动正在审核中，请您耐心等待。</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { STS_PRODUCT } from '@/conf/conf-status';
import { pagePublishState } from '@/memory/page';
import product_tool from '@/tool/modules/product_tool';
import { must_int } from '@/tool/util/valued';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const edit = computed(() => (pagePublishState.edit))

const dataStatus = computed((): number => (must_int(edit.value.dataStatus)))

const show = computed((): boolean => {
    if (dataStatus.value === STS_PRODUCT.STATUS.EDITING) {
        if (reviewStatus.value === STS_PRODUCT.REVIEW.NO) {
            return true
        }
    }
    return dataStatus.value === STS_PRODUCT.STATUS.CHECKING
})

const reviewStatus = computed((): number => (must_int(edit.value.reviewStatus)))
const reviewComment = computed((): string => edit.value.reviewComment)
</script>