<template>
    <OButton clazz="w-100">
        <view class="fx-s px-row py-s">
            <view class="fx-i">
                <UiI class="h6" :i="i"/>
                <view class="px">{{ tit }}</view>
            </view>
            <view><UiI :i="'r'"/></view>
        </view>
    </OButton>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    i: string,
    tit: string
}>()

</script>