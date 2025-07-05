<template>
    <view class="user-info">
        <view class="px-row">
            <view class="fx-i">
                <view class="w-6em h-6em br-cir o-h">
                    <image class="w-100 h-100" mode="aspectFill" :src="user.avatar"/>
                </view>
                <view class="pi-s">
                    <view class="pi-s pb-s">
                        <view class="pb c-fff fw-550 h6">{{ user.nickname }}</view>
                    </view>
                    <view class="pt-s">
                        <OTag :clazz="'fx-aii-btn-pri-iht pri fs-n'">老客户</OTag> &nbsp;
                    </view>
                </view>
            </view>
        </view>
        <!--
        <view class="fx-c pt-x1">
            <view class="ps-r zi-s">
                <view class="c-fff h6 b">{{ user.nickname }}</view>
            </view>
        </view>-->
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';

const prp = defineProps<{
    user: User
}>()

</script>

<style lang="sass" scoped>
.user-info
    transform: translateY(-50%)
</style>