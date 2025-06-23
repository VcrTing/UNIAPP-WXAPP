<template>
    <view class="">
        <view class="bg-con pt-col">
            <view class="">
                <CkInpItem :tit="'活动时间'" :clazz_tit="'tid'">
                    <input class="inp-app ta-r"
                        :value="timed" @tap="funn.openTimeChoise" placeholder="请挑选活动时间"/>
                </CkInpItem>
            </view>
            <view class="">
                <CkInpItem :tit="'活动地址'">
                    <view v-if="form.addrdata.documentId" class="ta-r pr-inp fx-r" @tap="funn.open_addr">
                        <view>{{ form.addrdata.address }}</view>
                        <view class="pi-s fs-n">
                            <CoImg clazz="w-2em h-2em br-cir" :src="mock_orders.mapimg"/>
                        </view>
                    </view>
                    <input v-else  @tap="funn.open_addr"
                        class="inp py-s px-inp br tils mh-inp ta-r" 
                        :placeholder="'活动碰面地点，可暂时不选'" 
                        :value="form.addrdata.address" />
                </CkInpItem>
            </view>
            <view class="">
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
            <!--  v-if="form.typed == DATA_ACTIVITY_TYPED_GK.v" -->
            <view class="py px-inp fx-aii-btn-def">
                <view class="pi tid fs-n pb-col">
                    <view>非公开类型活动，是指不会被展示在首页、不会被他人搜索到的，只属于个人的活动。</view>
                    <view>您可以主动邀请别人来参与您发布后的活动，限制人数为 99 人。</view>
                </view>
            </view>
            <view class="pb-col">
                <CkInpItem :tit="'报名费用'" :clazz_tit="'tid'">
                    <input class="inp-app ta-r" v-model="form.fee" type="number" placeholder="每位参与者的报名费用(￥)"/>
                </CkInpItem>
            </view>
        </view>
        <!-- -->
        <VwPpFormTimePan 
            :start="form.__start" :end="form.__end"
            :idx="pan_time.idx"/>
        <!-- -->
        <VwPpFormAddrChoisePagePan :idx="pan_addr.idx" :form="form"/>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButton from '@/cake/button/OButton.vue';
import { DATA_ACTIVITY_TYPED, DATA_ACTIVITY_TYPED_GK, DATA_ACTIVITY_TYPED_SM } from '@/conf/conf-datas';
import VwPpFormAddrChoisePagePan from './pan/VwPpFormAddrChoisePagePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import VwPpFormTimePan from './pan/VwPpFormTimePan.vue';
import times from '@/tool/web/times';

const form = reactive({
    typed: DATA_ACTIVITY_TYPED_GK.v,
    addrdata: <ActivityAddress>{ }, fee: undefined, participantLimit: undefined,
    __start: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    __end: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
})

const aii = reactive({

})

const pan_time = { idx: 30, hui: <ElePanHui>{ opacity: 0.4 } }
const pan_addr = { idx: 31, hui: <ElePanHui>{ opacity: 0.4 } }

const funn = {
    openTimeChoise: () => {
        pan_tooi.open_def_b(pan_time.idx, pan_time.hui)
    },
    open_addr: async () => {
        /*
        console.log('打开地址选择器')
        const res = await open_choise_addr()
        tipsucc('1. 选择地址成功')
        const latitude = res.latitude;
        const longitude = res.longitude;
        console.log('location res =', res)
        */
        pan_tooi.open_def_r(pan_addr.idx, pan_addr.hui)
    },

    vid: () => {
        return true
    },
    v: () => {
        if (funn.vid()) { return form }
        return null
    }
}

defineExpose(funn)

const typed = computed(() => {
    return DATA_ACTIVITY_TYPED
})

const timed = computed(() => {
    const s: Co.TimePieckerForm = form.__start
    const e: Co.TimePieckerForm = form.__end
    if (e.year) {
        const __st: string = times.build(s.year, s.month, s.day, s.hour, s.minute)
        const __ed: string = times.build(e.year, e.month, e.day, e.hour, e.minute)
        const st: string = times.fmt(__st, 'MM-DD HH:mm')
        const ed: string = times.fmt(__ed, 'MM-DD HH:mm')
        return st + ' 至 ' + ed
    }
    return ''
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