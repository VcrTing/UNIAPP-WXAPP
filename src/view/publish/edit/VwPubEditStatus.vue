<template>
    <view class="bg-con">
        <view class="pi-inp">
            <view class="fx-s">
                <view class="fx-i">
                    <view><text>操作</text></view>
                    <view class="fx-r py px-inp">
                        <!--
                        <switch class="o-switch" checked @change="funn.switchSelf" />
                        -->
                    </view>
                </view>
                <view class="fx-r pr-inp py-col">
                    <OButton @tap="funn.openTrash" color="err" clazz="px mh-btn fx-c br-rnd" :weak="true">
                        <UiI i="trash"/>
                        <text>删除活动</text>
                    </OButton>
                </view>
            </view>
            <CoAppConfirm @confirm="funn.trash"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoAppConfirm from '@/components/app/confirm/CoAppConfirm.vue';
import { app_confirm } from '@/conf/conf-app';
import pan_tooi from '@/tool/app/pan_tooi';
import { promise } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

const prp = defineProps<{
    aii: ONE, canedit: boolean
}>()

const form = reactive({
    address: '', timed: '', price: ''
})

const emt = defineEmits([ 'trash' ])

const funn = {
    openTrash: () => {
        app_confirm()
    },
    trash: () => promise(() => {
        console.log('删除')
    }), 
    switchSelf: () => {

    }
}
</script>

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