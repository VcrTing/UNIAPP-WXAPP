<template>
    <view class="">
        <view class="bg-con py-col">
            <view class="pi-inp">
                <CkInpItem :tit="'活动地址'">
                    <view v-if="form.addrdata.id" class="ta-r pr-inp fx-r" @tap="funn.open_addr">
                        <view>{{ form.addrdata.address }}</view>
                        <view class="pi-s fs-n">
                            <CoImg clazz="w-2em h-2em br-cir" :src="mock_orders.mapimg"/>
                        </view>
                    </view>
                    <input v-else  @tap="funn.open_addr"
                        class="inp py-s px-inp br tils mh-inp ta-r" 
                        :placeholder="'活动碰面地点，可选择常用地址'" 
                        :value="form.addrdata.address" />
                </CkInpItem>
            </view>
            <view class="pi-inp">
                <CkInpItem :tit="'活动类型'">
                    <view class="fx-r mh-inp pr-inp">
                        <view v-for="(v, i) in typed" :key="i"
                            @tap="form.typed = v.v"
                        >
                            <OButton :color="form.typed == v.v ? 'def' : 'wht'" 
                                clazz="fs-s py-t br-s px" :weak="true">{{ v.name }}</OButton>
                        </view>
                    </view>
                </CkInpItem>
            </view>
        </view>

        <!--
        <VwPpFormTimePan :idx="pan_time.idx" @result=""/>
        -->
        <VwPpFormAddrChoisePagePan :idx="pan_addr.idx" :form="form"/>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import { DATA_ACTIVITY_TYPED, DATA_ACTIVITY_TYPED_DEF } from '@/conf/conf-datas';
import VwPpFormAddrChoisePagePan from './pan/VwPpFormAddrChoisePagePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_orders from '@/server/mock/order/mock_orders';
// const prp = defineProps<{}>()

const form = reactive({
    typed: DATA_ACTIVITY_TYPED_DEF.v,
    addrdata: <ActivityAddress>{ }
})

const aii = reactive({
})

const pan_time = { idx: 30, hui: <ElePanHui>{ opacity: 0.4 } }
const pan_addr = { idx: 31, hui: <ElePanHui>{ opacity: 0.4 } }

const funn = {
    
    open_addr: () => {
        pan_tooi.open_def_r(pan_addr.idx, pan_addr.hui)
    },

    v: () => {
        return form
    }
}

defineExpose(funn)

const typed = computed(() => {
    return DATA_ACTIVITY_TYPED
})


</script>


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
            <CkInpItem class="" :tit="'开始时间'">
                <OInput :def="form.timed" @tap="funn.pan_for_form('time')" 
                    @result="(v) => form.timed = v" :pchd="'挑选开始时间'" :clazz_input="'ta-r'"/>
            </CkInpItem>
            <CkInpItem :tit="'活动地址'">
                <OInput :def="form.address" @result="(v) => form.address = v" :pchd="'活动碰面地点，可选择常用地址'"/>
            </CkInpItem>
            -->