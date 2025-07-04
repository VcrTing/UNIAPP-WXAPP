<template>
    <view class="fx-s" :class="clazz">
        <view v-if="tit" class="w-6em py-t pi-inp" :class="clazz_tit">
            <view class="inp py-s br mh-inp fx-i ps-r zi-t">
                <view v-if="prp.require">*</view>
                {{tit}}
            </view>
        </view>
        <view class="fx-1 ta-r ps-r zi-t pi-s">
            <slot></slot>
            <view class="abs-r middie">
                <slot name="r"></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    tit?: string,
    require?: boolean | undefined,
    clazz?: string,
    clazz_tit?: string
}>()

</script>