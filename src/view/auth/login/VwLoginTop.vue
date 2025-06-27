<template>
    <view class="pb-x2 softer">
        <view class="fx-c px py">
            <view class="mxw-12em">
                <view class="ani-scaie-aii">
                    <image class="mxw-12em uni-img" :class="'h7 w-5em h-5em br-x2'"
                        mode="aspectFill" 
                        :src="info.logoLogin"/>
                </view>
            </view>
        </view>
        <view class="fx-c pt-x1 c-fff">
            <view class="fw-500 op-80 ani-scaie-aii">{{ info.descLogin }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import Ov from '@/cake/button/touch/Ov.vue';
import appRouter from '@/tool/uni/app-router';

defineProps<{ info: AppInfo }>()

</script>