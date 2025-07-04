<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :mat="true" @back="uniRouter.back"/>
        <view class="py-row px-row">
            <view v-if="code == 0">
                展示 隐私政策
            </view>
            <view v-if="code == 1">
                展示 用户服务协议
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const code = computed(() => {
    const k = storage.get('PAGE_SECURITY_KEY') || 0
    return k
})
</script>