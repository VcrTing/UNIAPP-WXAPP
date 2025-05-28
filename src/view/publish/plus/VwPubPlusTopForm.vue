<template>
    <view class="">
        <view class="card pt-col">
            <!--<view class="header-s py">基本资料</view>-->
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
            </CkInpItem>
            <CkInpItem class="pt-x2 pb" :tit="''">
                <OInput :def="aii.form.name" @result="(v) => aii.form.name = v" 
                    class="h6" :pchd="'请输入活动标题'"/>
            </CkInpItem>
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