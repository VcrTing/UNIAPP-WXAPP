<template>
    <view class="fx-s">
        <view v-if="tit" class="w-6em py-t" :class="clazz_tit">
            <view class="inp py-s br mh-inp fx-i ps-r zi-t">
                <view v-if="prp.require">*</view>
                {{tit}}
            </view>
        </view>
        <view class="fx-1">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    tit?: string,
    require?: boolean | undefined,
    clazz_tit?: string
}>()

</script>