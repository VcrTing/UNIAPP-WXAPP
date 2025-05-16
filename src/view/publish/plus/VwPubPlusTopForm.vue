<template>
    <view class="">
        <view class="card pa-card">
            <view class="header-s py">基本资料</view>
            <CkInpItem class="pt pb-s" :tit="''">
                <OInput :def="aii.form.name" @result="(v) => aii.form.name = v" 
                    class="h7" :pchd="'请输入活动标题'"/>
            </CkInpItem>
            <CkInpItem class="pt" :tit="'描述'">
                <OTextarea class="pt-t" :def="aii.form.description" @result="(v) => aii.form.name = v" 
                    :pchd="'请输入文字描述'"/>
            </CkInpItem>
            <CkInpItem class="pt" :tit="'背景图'">
                <OFile class="px-x2">
                    <UiI :i="'+'"/>
                </OFile>
            </CkInpItem>
            <CkInpItem class="pt" :tit="'标签'">
                <view class="mh-inp pb-s pt-n px-inp">
                    <OButtonDef :weak="true" clazz="d-ib px-s br-s mr">黑丝</OButtonDef>
                    <OButtonDef :weak="true" clazz="d-ib px-s br-s mr">JK</OButtonDef>
                    <OButtonDef :weak="true" clazz="d-ib px-s br-s">约会</OButtonDef>
                </view>
            </CkInpItem>
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