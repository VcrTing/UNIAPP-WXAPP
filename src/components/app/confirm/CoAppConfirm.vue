<template>
    <OPan :idx="pan.idx">
        <OPanInnerY :h="'14em'" :idx="pan.idx" :orientation="'b'">
            <view class="px-row pt">
                <view class="header-s py-row ta-c">
                    <text>提示</text>
                </view>
            </view>
            <view class="px-row py-col">
                <view class="tid px-col">
                    <slot></slot>
                </view>
            </view>
            <view class="px-row pt">
                <view @tap="confirm">
                    <OButton clazz="btn-app" color="def">确定执行</OButton>
                </view>
                <view @tap="cancle" class="py"></view>
                <view @tap="cancle">
                    <OButton clazz="btn-app" color="wht">取消</OButton>
                </view>
                <view @tap="cancle" class="py"></view>
            </view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import pan_tooi from '@/tool/app/pan_tooi';

// const prp = defineProps<{}>()

const pan = { idx: 1001, hui: <ElePanHui>{ opacity: 0.4 } }

const emt = defineEmits([ 'confirm', 'cancle' ])

const confirm = () => {
    pan_tooi.close_pan(pan.idx)
    emt('confirm')
}

const cancle = () => {
    pan_tooi.close_pan(pan.idx)
    emt('cancle')
}
</script>