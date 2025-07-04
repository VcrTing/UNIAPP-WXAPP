<template>
    <view>
        <view class="fx-s fx-t">
            <view class="pt-s">
                <text class="h7 fw-550 tih">{{ tit }}</text>
            </view>
            <view>
                <text class="tis fs-s">{{ timed }}</text>
            </view>
        </view>
        <view class="tiw pt-t eiies">
            <text class="fs-w">{{ msg }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    tit: string,
    msg: string,
    timed: string
}>()

</script>