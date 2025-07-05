<template>
    <view>
        <view v-if="show" class="py-row btn-err softer">
            <view class="px-inp" v-if="reviewStatus == 0">
                <view class="h7 pb">提醒</view>
                <view>您提交的活动正在审核中，请您耐心等待。</view>
            </view>
            <view class="px-inp" v-else>
                <view class="h7 pb">审核不通过</view>
                <view>审核意见:&nbsp;&nbsp;{{ reviewComment || '含低俗内容，违背秩序。' }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { STS_PRODUCT } from '@/conf/conf-status';
import { pagePublishState } from '@/memory/page';
import { must_int } from '@/tool/util/valued';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const edit = computed(() => (pagePublishState.edit))

const dataStatus = computed((): number => (must_int(edit.value.dataStatus)))

const show = computed((): boolean => {
    return dataStatus.value === STS_PRODUCT.STATUS.CHECKING
})

const reviewStatus = computed((): number => (must_int(edit.value.reviewStatus)))
const reviewComment = computed((): string => edit.value.reviewComment)
</script>