<template>
    <ODiv :weak="true">
        <view class="">
            <view class="ta-c pb-s">
                <view class="h3 fw-550">{{ num }}</view>
            </view>
            <view class="tid"><slot></slot></view>
        </view>
    </ODiv>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';

const prp = defineProps<{
    num: number
}>()

</script>