<template>
    <view>
        <view>
            <view class="px-row pb-row">
                <view class="px-x2 py-row">
                    <view class="header fx-i">
                        <view class="">你好，发起者</view>
                    </view>
                </view>
            </view>
            <view class="px-row">
                <OInput 
                    :pchd="'请输入工作人员号码'"
                    class="pb-row" :clazz_input="'bg-pag-pri br-rnd'"/>
            </view>
            <view class="px-row">
                <view class="py-x3"></view>
                <view class="fx-c">
                    <OButton @tap="uniRouter.navigatorpg('user')" :weak="true" :clazz="'br-cir w-6em h-6em fx-c'">
                        <UiI class="h3" :i="'a-r'"/>
                    </OButton>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';

// const prp = defineProps<{}>()

</script>