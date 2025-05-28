<template>
    <OPan :idx="aii.pan_idx">
        <OPanInnerY :h="'38.2vh'" :idx="aii.pan_idx" :orientation="'b'">
            <view class="py-row">
                
            </view>
            <view class="px-row">
                <VwLoginModCon/>
            </view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import VwLoginForm from '@/view/auth/login/VwLoginForm.vue';
import VwLoginModCon from '@/view/auth/login/VwLoginModCon.vue';
import { reactive, watch } from 'vue';

const aii = reactive({
    pan_idx: 1000, hui: <ElePanHui>{ opacity: 0.4 }
})

const funn = {
    iive: (v: boolean) => {
        if (v) {
            pan_tooi.open_def_b(aii.pan_idx, aii.hui)
        }
        else {
            pan_tooi.close_pan(aii.pan_idx)
        }
    } 
}

defineExpose(funn)
</script>