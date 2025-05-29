<template>
    <view class="pt">

        <view class="card pb-col br-0">
            <!--<view class="header-s py">基本资料</view>-->
            <view class="fx-i">
                <view class="w-80 h-16vh fx-c ps-r zi-t">
                    <CoImg clazz="h-100" :v="mock_orders.banner"/>
                    <view class="abs-b r-0">
                        <view class="px py bg-028">
                            <UiI i='edit' clazz="c-fff"/>
                        </view>
                    </view>
                </view>
                <OButtonDef clazz="w-25 h-16vh fx-c" :weak="true">
                    <view class="fs-n tiw">
                        <UiI clazz='d-ib' i='+'/>
                        <text class="px-s">添加</text>
                        <view>图片</view>
                    </view>
                </OButtonDef>
            </view>
            <CkInpItem class="pt-x2 pb-s" :tit="''">
                <OInput :def="aii.form.name" @result="(v) => aii.form.name = v" 
                    class="h6" :pchd="'请输入活动标题'"/>
            </CkInpItem>
            <view class="px-inp">
                <view>标签</view>
                <view class="pt pb">
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">黑丝</OButtonDef>
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">牵手约会</OButtonDef>
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">台球助教</OButtonDef>
                    <OButtonWht @tap="appRouter.chose_tags">
                        <UiI i='edit' clazz="tiw"/>
                    </OButtonWht>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import OTextarea from '@/cake/input/textarea/OTextarea.vue';
import { reactive } from 'vue';
import OFile from '@/cake/input/file/OFile.vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import appRouter from '@/tool/uni/app-router';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import mock_orders from '@/server/mock/order/mock_orders';
import OButton from '@/cake/button/OButton.vue';
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