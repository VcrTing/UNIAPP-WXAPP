<template>
    <view class="bg-con">
        <view class="pi-inp">
            <view class="fx-s">
                <view class="tiw fx-i">
                    <view><text>活动上架</text></view>
                    <view class="fx-r py px-inp">
                        <switch class="o-switch" checked @change="funn.switchSelf" />
                    </view>
                </view>
                <view class="fx-r pr-row">
                    <OButton color="err" clazz="px mh-btn fx-c br-rnd" :weak="true">
                        <UiI i="trash"/>
                        <text>删除活动</text>
                    </OButton>
                </view>
            </view>
        </view>
        <!--
        <view class="pt-x2 px-inp pb">
            <view class="fx-r">
                <OButton color="err" clazz="px mh-btn fx-c br-rnd" :weak="true">
                    <UiI i="trash"/>
                    <text>删除活动</text>
                </OButton>
            </view>
        </view>
        -->
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const form = reactive({
    address: '', timed: '', price: ''
})
const funn = {
    switchSelf: () => {

    }
}
</script>