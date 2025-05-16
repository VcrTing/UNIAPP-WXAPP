<template>
    <view class="fx-s fx-t">
        <view v-if="tit" class="w-4em ta-r py-t" :class="clazz_tit">
            <view class="inp py-s br mh-inp">{{tit}}</view>
        </view>
        <view class="fx-1">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    tit?: string,
    clazz_tit?: string
}>()

</script>