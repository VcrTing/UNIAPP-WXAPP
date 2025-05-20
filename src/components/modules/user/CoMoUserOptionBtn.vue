<template>
    <view class="btn px py br fx-aii-btn-bd-def">
        <view class="fx-c pb-n">
            <UiI class="h5" :i="i"/>
        </view>
        <view class="mw-4em">{{ tit }}</view>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    i: string,
    tit: string
}>()
</script>