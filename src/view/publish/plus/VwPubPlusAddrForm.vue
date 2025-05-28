<template>
    <view class="">
        <view class="card py-col">
            <view class="pi-col">
                <CkInpItem :tit="'活动类型'">
                    <view class="fx-r mh-inp pr-inp">
                        <OButton :color="form.typed == 0 ? 'def' : 'wht'" 
                            clazz="fs-s py-t br-s px" :weak="true">大众活动</OButton>
                        <view class="px"></view>
                        <OButton :color="form.typed == 1 ? 'def' : 'wht'" 
                            clazz="fs-s py-t br-s px" :weak="true">非公开活动</OButton>
                    </view>
                </CkInpItem>
            </view>
            <!--
            <CkInpItem class="pt" :tit="'人数'">
                <OInput :def="form.minute" @result="(v) => form.minute = v" :pchd="'请输入最大可参与人数'"/>
            </CkInpItem>
            -->
            <!--
            <CkInpItem :tit="'报名费'">
                <OInput :def="form.minute" @result="(v) => form.minute = v" :pchd="'请输入每人支付金额（人民币）'"/>
            </CkInpItem>
            -->
            <!--
            <CkInpItem :tit="'活动地址'">
                <OInput :def="form.address" @result="(v) => form.address = v" :pchd="'活动碰面地点，可选择常用地址'"/>
            </CkInpItem>
            -->
            <view class="pi-col">
                <CkInpItem class="pt" :tit="'开始时间'" :require="true">
                    <OInput :def="form.timed" @tap="funn.pan_for_form('time')" 
                        @result="(v) => form.timed = v" :pchd="'挑选开始时间'" :clazz_input="'ta-r'"/>
                </CkInpItem>
                <CkInpItem :tit="'活动标签'" :require="true">
                    <view class="mh-inp pb-s pt-n pr-inp fx-r">
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px-s br-s mr">黑丝</OButtonDef>
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px-s br-s mr">JK</OButtonDef>
                        <OButtonDef :weak="true" clazz="fs-n tid d-ib px-s br-s">约会</OButtonDef>
                    </view>
                </CkInpItem>
            </view>
        </view>

        <VwPpFormTimePan :idx="aii.pan_form_idx" @result="funn.result_time"/>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import OTextarea from '@/cake/input/textarea/OTextarea.vue';
import { reactive } from 'vue';
import OFile from '@/cake/input/file/OFile.vue';
import UiI from '@/ui/element/i/UiI.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import VwPpFormTimePan from './pan/VwPpFormTimePan.vue';
import { storage } from '@/tool/web/storage';
import pan_tooi from '@/tool/app/pan_tooi';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
// const prp = defineProps<{}>()

const form = reactive({
    minute: '', timed: '', address: '', agree: false, typed: 1,
})

const aii = reactive({
    pan_form_idx: 1, pan_hui: <ElePanHui>{ opacity: 0.4 }
})

const funn = {
    result_time: () => {
        pan_tooi.close_pan(aii.pan_form_idx)
    },
    pan_for_form: (code: PUBLISH_PLUS_PAN_CONTENT_CODE) => {
        storage.set('publish_plus_pan_content_code', code)
        pan_tooi.open_def_b(aii.pan_form_idx, aii.pan_hui)
    },
    look: (v: number) => {

    }
}

defineExpose(funn)




</script>