<template>
    <view class="">
        <view class="">
            <!--<view class="header-s py">基本资料</view>-->
            <view class="fx-i">
                <view class="w-80 h-16vh fx-c ps-r zi-t">
                    <CoImg clazz="h-100" :v="mock_orders.banner"/>
                    <view class="abs-b r-0">
                        <view class="px py bg-028">
                            <UiI i='trash' clazz="c-fff"/>
                        </view>
                    </view>
                </view>
                <OButtonDef clazz="w-333 h-12vh fx-c br-s" :weak="true">
                    <view class="fs-n tiw">
                        <UiI :clazz="'d-ib'" :i="'+'"/>
                        <text class="px-s">添加优质</text>
                        <view>图片更吸引人</view>
                    </view>
                </OButtonDef>
            </view>
            <view class="bg-con">
                <CkInpItem class="pt-x2 pb" :tit="''">
                    <OInput :def="aii.form.name" @result="(v) => aii.form.name = v" 
                        class="h6" :pchd="'请输入活动标题'"/>
                </CkInpItem>
                <view class="pi-inp py">
                    <view class="pb-s"><text>标签</text></view>
                    <view class="mh-inp pb-s pt-n">
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px br-s mr">黑丝</OButtonDef>
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px br-s mr">JK</OButtonDef>
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px br-s">约会</OButtonDef>
                    </view>
                </view>
            </view>
            <!--<view class="header-s py">基本资料</view>
            <CkInpItem class="pt" :tit="''">
                <OFile class="px-x2">
                    <OButtonDef clazz="w-333 h-12vh fx-c br-s" :weak="true">
                        <view class="fs-n tiw">
                            <UiI :clazz="'d-ib'" :i="'+'"/>
                            <text class="px-s">添加优质</text>
                            <view>图片更吸引人</view>
                        </view>
                    </OButtonDef>
                </OFile>
            </CkInpItem>-->
            <!--
            <CkInpItem class="pt" :tit="''">
                <OTextarea class="pt-t" :def="aii.form.description" @result="(v) => aii.form.name = v" 
                    :pchd="'请输入活动描述'"/>
            </CkInpItem>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import OTextarea from '@/cake/input/textarea/OTextarea.vue';
import { reactive } from 'vue';
import CoVwPpFormItem from '../component/CoVwPpFormItem.vue';
import OFile from '@/cake/input/file/OFile.vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import ODashBtn from '@/cake/content/ODashBtn.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import CoImg from '@/components/media/img/CoImg.vue';

// const prp = defineProps<{}>()
const aii = reactive({
    form: {
        name: '', description: ''
    }
})

const funn = {

}

defineExpose(funn)
</script>