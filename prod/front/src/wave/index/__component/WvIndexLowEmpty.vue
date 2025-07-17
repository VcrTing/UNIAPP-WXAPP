<template>
    <view>
        <CkSpace :h="3"/>
        <view class=" w-100" v-if="index.end">
            <view class="py-row px-row fx-aii-btn-def fx-c">
                <view class="fs-n cos">到底了，暂无更多数据。</view>
            </view>
        </view>
        <CkSpace :h="1"/>
        <view class="mh-app-bottom-bar"></view>
    </view>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';

defineProps<{
    index: ONE
}>()

</script>