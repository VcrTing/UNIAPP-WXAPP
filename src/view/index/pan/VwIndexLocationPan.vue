<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'38.2vh'" :idx="idx" :orientation="'t'">
                <template #bom>
                    <view class="fx-s bg-con">
                        <OButtonWht @tap="funn.close" clazz=""><view class="pr">取消</view></OButtonWht>
                        <view class="py"><text class="h7 fw-550"></text></view>
                        <OButtonWht @tap="funn.submit"><view class="pi pri">确定</view></OButtonWht>
                    </view>
                </template>
                <OSafeAreaTop/>
                <CoMoAddressSwitchContent ref="loc"/>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButtonWht from '@/cake/button/OButtonWht.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoMoAddressSwitchContent from '@/components/modules/address/CoMoAddressSwitchContent.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import { must_one } from '@/tool/util/valued';

const prp = defineProps<{
    idx: number
}>()

const aii = reactive({
    
})

const loc = ref()

const emt = defineEmits([ 'result', 'x' ])

const funn = {
    close: () => { pan_tooi.close_pan(prp.idx) },

    submit: () => {
        const v: ONE = must_one(loc.value.v())
        console.log('切换城市 =', v)
        funn.close()
    },
}
</script>
