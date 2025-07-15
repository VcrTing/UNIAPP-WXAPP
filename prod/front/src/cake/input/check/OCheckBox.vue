<template>
    <view :class="clazz">
        <view v-if="iive" class="pri w-2em h-2em fx-c o-checkbox-iive btn-pri br-cir c-p">
            <view class="fs-s softer">
                <UiI i="check" clazz=""/>
            </view>
        </view>
        <view v-else class="w-2em h-2em br-cir o-checkbox-die fx-c c-p softer" :class="clazz_die">
            <view class="o-checkbox-inner"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    iive?: boolean,
    clazz?: string,
    clazz_die?: string
}>()

</script>