<template>
    <view>
        <view class="pt">
            <view class="h5 tit tils-x1 fw-550">
                {{ one.title }}
            </view>
        </view>
        <view class="pt">
            <view class="d-ib">
                <view class="btn-blue fx-c py-t pi-s pr-t br-s">
                    <view class="fs-s fw-800">自动退</view>
                    <UiI clazz="fs-n" :i="'r'"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    one: Activity
}>()

</script>