<template>
    <view>
        <view class="py-x3">
            <view class="fx-c">
                <text>登录成功。</text>
            </view>
        </view>
        <view class="pt-x2 fx-c">
            <view class="pt w-618">
                <OButton clazz="btn-app" @tap="pan_tooi.close_pan(loginhouse.pan_idx)">
                    <view class="py-s">确定</view>
                </OButton>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import { authState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import { computed } from 'vue';

// const prp = defineProps<{}>()
const loginhouse = computed(() => authState.loginhouse)
</script>