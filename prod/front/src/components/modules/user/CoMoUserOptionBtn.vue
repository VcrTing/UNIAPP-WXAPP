<template>
    <view class="btn px pb pt-s br" :class="clazz">
        <view class="fx-c mh-3em">
            <UiI class="h5" :i="i"/>
        </view>
        <view class="mw-4em">{{ tit }}</view>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    i: string,
    tit: string,
    clazz?: string
}>()
</script>