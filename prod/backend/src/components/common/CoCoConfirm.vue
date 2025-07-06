<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            <view>
                <view class="py header-s ta-c">确定？</view>
            </view>
            <view class="py">
                <view class="px-row">
                    <view><OButton @tap="emt('cancle')" color="def" clazz="btn-app">取消</OButton> </view>
                    <view class="py-s"></view>
                    <view><OButton :ioading="ioading" @tap="emt('submit')" color="pri" clazz="btn-app">确定</OButton> </view>
                </view>
            </view>
            <CkSpace :h="6"/>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import pan_tooi from '@/tool/app/pan_tooi';

const prp = defineProps<{
    idx: number,
    ioading: boolean
}>()

const emt = defineEmits([ 'submit', 'cancle' ])
</script>