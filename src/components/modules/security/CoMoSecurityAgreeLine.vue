<template>
    <view class="py btn-def px br">
        <view class="fx-i fx-t">
            <view class="px">
                <radio class="" :value="'true'" :checked="aii.agree" />
            </view>
            <view class="">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    aii: ONE
}>()

</script>