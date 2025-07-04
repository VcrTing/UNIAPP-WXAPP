<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    
    <view>
        <CoAppTopBackBar @back="uniRouter.back"/>
        <view>
            <AuthIntorTop/>
            <view>
                <AuthIntorForm/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import AuthIntorForm from '@/view/auth/intor/AuthIntorForm.vue';
import AuthIntorTop from '@/view/auth/intor/AuthIntorTop.vue';

// const prp = defineProps<{}>()
</script>