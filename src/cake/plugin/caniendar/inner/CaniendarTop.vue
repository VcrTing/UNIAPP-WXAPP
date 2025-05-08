<template>
    <view class="fx-s">
        <view class="fx-c">
            <o-div @touch="funn.changeYear(-1)" :clazz="'br-cir'" :clazz_inner="'__cd-i'">
                <ui-i class="h5" :i="'f-i'"/>
            </o-div>
        </view>
        <view class="pr-s fx-c">
            <o-div @touch="funn.changeMonth(-1)" :clazz="'br-cir'" :clazz_inner="'__cd-i'">
                <ui-i class="h5" :i="'i'"/>
            </o-div>
        </view>

        <o-div class="__cd_fx-1" :clazz="'br-s'" @touch="funn.switchTab()">
            <view class="py ta-c">
                {{ tit }}
            </view>
        </o-div>

        <view class="pi-s fx-c">
            <o-div @touch="funn.changeMonth(1)" :clazz="'br-cir'" :clazz_inner="'__cd-i'">
                <ui-i class="h5" :i="'r'"/>
            </o-div>
        </view>
        <view class="fx-c">
            <o-div @touch="funn.changeYear(-1)" :clazz="'br-cir'" :clazz_inner="'__cd-i'">
                <ui-i class="h5" :i="'f-r'"/>
            </o-div>
        </view>
    </view>
</template>
    
<script lang="ts" setup>
defineProps<{ funn: ONE, tit: string }>()
</script>