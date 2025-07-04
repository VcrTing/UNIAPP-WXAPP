<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <view class="py-row px-row">
            <view v-if="code == 0">
                <OrderPaySucc/>
            </view>
            <view v-if="code == 1">
                支付成功，用户邀请中
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import { storage } from '@/tool/web/storage';
import OrderPaySucc from '@/view/status/pay/OrderPaySucc.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const code = computed(() => {
    const k = storage.get('PAGE_PAYSUCC_KEY') || 0
    return k
})
</script>