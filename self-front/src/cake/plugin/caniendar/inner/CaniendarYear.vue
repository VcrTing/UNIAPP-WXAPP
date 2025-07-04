<template>
    <view class="fx-s py-s">
        <view class="fx-c pi-s">
            <o-div @touch="funn.changeYear(-5)" :clazz="'__cd-br-s'">
                <view class="__cd-i">-5</view>
            </o-div>
        </view>
        <view class="fx-c">
            <o-div @touch="funn.changeYear(-1)" :clazz="'__cd-br-s'">
                <view class="__cd-i">-1</view>
            </o-div>
        </view>

        <o-div class="__cd_fx-1" :clazz="'__cd-br-s'">
            <view class="fx-c py-s px"><slot></slot></view>
        </o-div>

        <view class="fx-c">
            <o-div @touch="funn.changeYear(1)" :clazz="'__cd-br-s'">
                <view class="__cd-i">+1</view>
            </o-div>
        </view>
        <view class="fx-c pr-s">
            <o-div @touch="funn.changeYear(5)" :clazz="'__cd-br-s'">
                <view class="__cd-i">+5</view>
            </o-div>
        </view>
    </view>
</template>
    
<script lang="ts" setup>
defineProps<{
    funn: ONE
}>()
</script>