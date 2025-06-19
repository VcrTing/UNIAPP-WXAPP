<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'42vh'" :idx="idx" :orientation="'t'">
                <template #bom>
                    <view class="fx-s bg-con br-br br-bi o-h">
                        <OButton color="wht" clazz="px-row py" :weak="true" @tap="funn.close"><view class="">取消</view></OButton>
                        <view class="py"><text class="h7 fw-550"></text></view>
                        <OButton color="wht" clazz="px-row py" :weak="true" @tap="funn.submit"><view class="pri">确定</view></OButton>
                    </view>
                </template>
                <OSafeAreaTop/>
                <CoMoAddressSwitchContent ref="loc"/>
                <CkSpace :h="2"/>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoMoAddressSwitchContent from '@/components/modules/address/CoMoAddressSwitchContent.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import { must_one } from '@/tool/util/valued';
import { pageIndexCommit } from '@/memory/page';
import OButton from '@/cake/button/OButton.vue';

const prp = defineProps<{ idx: number }>()

const aii = reactive({
    
})

const loc = ref()
const emt = defineEmits([ 'result', 'x' ])

const funn = {
    close: () => { pan_tooi.close_pan(prp.idx) },

    submit: () => {
        const v: Conf.City = must_one(loc.value.v())
        pageIndexCommit('change', [ 'city', v ])
        funn.close()
    },
}
</script>
