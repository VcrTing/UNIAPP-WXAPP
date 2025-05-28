<template>
    <view class="fx-s fx-t">
        <view v-if="tit" class="w-5em py-t" :class="clazz_tit">
            <view class="inp py-s br mh-inp">
                <text v-if="prp.require">*</text>
                <text v-else class="pr-t">&nbsp;</text>
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