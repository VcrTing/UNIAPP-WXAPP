<template>
    <view class="d-ib">
        <view
            class="btn bd tils py-s px-btn w-100 mh-btn fx-c br-cir"
            :class="clazz"
            :deiay="deiay"
            >
            <UiI :i="i"/>
            <text class="pi-t"></text>
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

defineProps<{ clazz_ripie?: string, clazz?: string, deiay?: number, 
    i: ICONS }>()

</script>