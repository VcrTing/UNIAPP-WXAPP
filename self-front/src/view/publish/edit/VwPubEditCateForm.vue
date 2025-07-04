<template>
    <view>
        <view class="bg-con py-s">
            <CkInpItem :tit="'活动时间'" :clazz_tit="'tid'">
                <input class="inp-app ta-r" v-if="canedit"
                    :value="timed" @tap="funn.openTimeChoise" placeholder="请挑选活动时间"/>
                <view class="ta-r pr-inp" v-else>{{timed}}</view>
            </CkInpItem>
            <view>
                <CkInpItem :tit="'活动地址'">
                    <view v-if="form.address" class="ta-r pr-inp fx-r" @tap="funn.openAddr">
                        <view>{{ form.address }}</view>
                        <view class="pi-s fs-n">
                            <CoImg clazz="w-2em h-2em br-cir" :src="mock_orders.mapimg"/>
                        </view>
                    </view>
                    <input v-else :value="form.address" @tap="funn.openAddr"
                        class="inp py-s px-inp br tils mh-inp ta-r" 
                        :placeholder="'活动碰面地点，可暂时不选'"/>
                </CkInpItem>
            </view>
            <CkInpItem :tit="'活动类型'">
                <view class="fx-r mh-inp pr-inp">
                    <OButton v-for="(v, i) in types" :key="i"
                        :color="form.typed == v.v ? 'def' : 'wht'" 
                        @tap="funn.switchTyped(v.v)"
                        clazz="fs-s py-t br-rnd px mi" :weak="true">{{ v.name }}</OButton>
                </view>
            </CkInpItem>
            <!--  v-if="form.typed == DATA_ACTIVITY_TYPED_GK.v" -->
            <CkInpItem :tit="'报名费用'" :clazz_tit="'tid'">
                <input class="inp-app ta-r" v-if="canedit" v-model="form.fee" type="number" placeholder="每位参与者的报名费用(￥)"/>
                <view class="ta-r pr-inp" v-else>{{form.fee}}</view>
            </CkInpItem>
            <CkInpItem :tit="'人数限制'" :clazz_tit="'tid'">
                <input class="inp-app ta-r" v-if="canedit" v-model="form.participantLimit" type="number" placeholder="每位参与者支付的报名费用"/>
                <view class="ta-r pr-inp" v-else>{{form.participantLimit}}</view>
            </CkInpItem>
        </view>

        <VwPpFormTimePan 
            :start="form.__start" :end="form.__end"
            :idx="pan_time.idx"/>
            
        <VwPpFormAddrChoisePagePan :idx="pan_addr.idx" :form="form"/>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import { computed, reactive } from 'vue';
import VwPpFormTimePan from '../plus/pan/VwPpFormTimePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import times from '@/tool/web/times';
import { DATA_ACTIVITY_TYPED, DATA_ACTIVITY_TYPED_GK } from '@/conf/conf-datas';
import mock_orders from '@/server/mock/order/mock_orders';
import CoImg from '@/components/media/img/CoImg.vue';
import VwPpFormAddrChoisePagePan from '../plus/pan/VwPpFormAddrChoisePagePan.vue';

const prp = defineProps<{
    form: ONE, canedit: boolean
}>()

const types: MANY = DATA_ACTIVITY_TYPED

const timed = computed(() => {
    const s: Co.TimePieckerForm = prp.form.__start
    const e: Co.TimePieckerForm = prp.form.__end
    if (e.year) {
        const __st: string = times.build(s.year, s.month, s.day, s.hour, s.minute)
        const __ed: string = times.build(e.year, e.month, e.day, e.hour, e.minute)
        const st: string = times.fmt(__st, 'MM-DD HH:mm')
        const ed: string = times.fmt(__ed, 'MM-DD HH:mm')
        return st + ' 至 ' + ed
    }
    return ''
})

const funn = {
    openTimeChoise: () => {
        pan_tooi.open_def_b(pan_time.idx, pan_time.hui)
    },
    switchTyped: (v: number) => {
        if (!prp.canedit) return;
        prp.form.typed = v
    },
    openAddr: async () => {
        if (!prp.canedit) return;
        /*
        console.log('打开地址选择器')
        await open_choise_addr()
        */
        pan_tooi.open_def_r(pan_addr.idx, pan_addr.hui)
    }
}

const pan_time = { idx: 11, hui: <ElePanHui> { opacity: 0.1 } }
const pan_addr = { idx: 12, hui: <ElePanHui>{ opacity: 0.4 } }

// const start = reactive(<Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 })
// const end = reactive(<Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 })
</script>

            <!--
            <CkInpItem :tit="'私密活动'" :clazz_tit="'tid'">
                <view class="fx-r py pr-inp">
				    <switch class="o-switch" checked @change="funn.switchSelf" />
                </view>
            </CkInpItem>
            -->
            <!--
            <CkInpItem :tit="'碰面地点'" :clazz_tit="'tid'">
                <OInput :clazz_input="'ta-r'" :def="form.address" @result="(v) => form.address = v" :pchd="'活动碰面地点，可选择常用地址'"/>
            </CkInpItem>
            -->