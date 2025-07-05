<template>
    <view class="py">
        <view class="pt fx-s fx-b">
            <view class=" pb">
                <text class="header">{{ tit }}</text>
            </view>
            <view class="fx-r fx-1 pi">
                <o-div :clazz="'br-ti br-bi'">
                    <view class="px-con py">
                        <text>{{ tis ? tis : '全部' }}</text>
                    </view>
                </o-div>
            </view>
        </view>
        <view class="pt-n"></view>
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
defineProps<{ 
    tit?: string,
    tis?: string,

}>()

</script>