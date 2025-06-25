<template>
    <view>
        <view class="py-row">
            <OScrollX>
                <view class="ts softer pr-row" v-if="choises && choises.documentId">
                    <view class="d-ib pi pb w-100">
                        <view class="btn-wht w-100 br px-col py-col" :weak="true">
                            <view class="ta-i py h8 fw-550">
                                <text>{{ choises.province }}，</text>
                                <text>{{ choises.city }}</text>
                            </view>
                            <view class="fx-s pb fx-b">
                                <view class="pr-s">{{ choises.address }}</view>
                                <view class="tis" v-if="choises.documentId">
                                    <text>{{ address_tool.cpu_km_for_user(choises) }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else class="op-0 pb">
                    <view class="d-ib pi pb w-100">
                        <view class="btn-wht w-100 br px-col py-col" :weak="true">
                            <view class="ta-i py h8 fw-550">
                                <text>&nbsp;</text>
                            </view>
                            <view class="fx-s pb">
                                <view class="">&nbsp;</view>
                                <view class="tis">
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollX>
        </view>
        <view class="px-row">
            <view class="card py-card ps-r zi-t">
                <OScrollY 
                    :styie="{
                        'height': 'calc(100vh - 28em)'
                    }"
                >
                    <view class="py-col">
                        <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                            <view class="pb-s" v-for="(v, i) in tags" :key="i">
                                <view 
                                    class="fx-aii-btn-def py-s pr-row h-3em fx-i"
                                    :class="(funn.has(v) ? '' : '') + ' '"
                                    @tap="funn.chose(v)">
                                    <view class="px-row">
                                        <UiI v-if="funn.has(v)" i="check" clazz="pri h7"/>
                                        <view v-else class="pi-s"></view>
                                    </view>
                                    <view class="">
                                        <text class="">{{ v.city }}，</text>
                                        <text>{{ v.address }}&nbsp;</text>
                                        <view class="d-ib pi-s">
                                            <OButton color="pri-iht" clazz="fs-s px-s br-1" :weak="true">常用</OButton>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </CoViDataLoading>
                        <CkSpace :h="2"/>
                    </view>
                </OScrollY>
                <view class="abs-b i-0 w-100">
                    <view class="fx-aii-btn-def br-br br-bi" @tap="pan_tooi.open_def_t(pan_add.idx, pan_add.hui)">
                        <view class="h-1 bg-hr"></view>
                        <view class="fx-c py tid">
                            <UiI i="+"/>
                            <text class="pi-s">新增地址</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <OPan :idx="pan_add.idx">
            <OPanInnerY :idx="pan_add.idx" :orientation="'t'">
                <view>
                    <CoImg :src="mock_orders.mapimg" clazz="w-100 h-14vh"/>
                </view>
                <view class="py-row">
                    <view class="px-row">
                        <CkInpLgItem :tit="'所选地址'">
                            <textarea v-model="newdata.address"
                                class="inp-app btn-def br mxh-4em py-s" placeholder="点击选择新地址"/>
                            <template #r><view><UiI i="r"/></view></template>
                        </CkInpLgItem>
                        <view class="pb-s"></view>
                        <CkInpLgItem :tit="'地址备注'">
                            <input v-model="newdata.remark" class="inp-app fx-aii-btn-def br" placeholder="地址备注，可为空"/>
                        </CkInpLgItem>
                    </view>
                </view>
                <view class="py-row">
                    <view class="pt fx-c">
                        <view class="w-50">
                            <OButton :ioading="aii.ioading" @tap="func.submit" 
                                color="pri-out" clazz="btn-app">确认新增</OButton>
                        </view>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CkInpLgItem from '@/cake/input/wrapper/CkInpLgItem.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { authGetters } from '@/memory/global';
import server_address from '@/server/common/server_address';
import mock_orders from '@/server/mock/order/mock_orders';
import pan_tooi from '@/tool/app/pan_tooi';
import address_tool from '@/tool/modules/common/address_tool';
import { tipwarn } from '@/tool/uni/uni-global';
import { future, futuring, promise, timeout } from '@/tool/util/future';
import { is_nice_arr, is_nice_sn, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const choises = computed((): Address => {
    return must_one<ONE>(prp.form).addrdata || { }
})

const aii = reactive({
    items: <Address[]>[ ], ioading: false,
})
const newdata = reactive(<Address>{ 
    province: '广东', country: '', addressSystem: '', area: '南山区',
    address: '南山区世界之窗', longitude: 113.972992, latitude: 22.534607, city: '深圳', remark: '' })

const tags = computed(() => {
    return aii.items
})

const funn = {
    has: (v: Address) => {
        const documentId: string = choises.value.documentId || '';
        return v.documentId == documentId
    },
    chose: (v: Address) => {
        prp.form.addrdata = v;
        console.log(prp.form)
        prp.form.address = v.address
    },
    kiii: (v: Address) => {
        prp.form.addrdata = { }
        prp.form.address = ''
    },
    reset: () => {
        newdata.address = ''; newdata.city = ''
    },
    vid: () => {
        if (!is_nice_sn(newdata.address)) {
            tipwarn('请选择活动地址。')
            return false
        }
        if (!is_nice_sn(newdata.longitude + '')) {
            tipwarn('请选择活动地址。')
            return false
        }
        return true
    }
}

const func = {
    submit: () => futuring(aii, async () => {
        if (funn.vid()) {
            const form = <ONE>{
                ...newdata, user: authGetters.userid
            }
            const src: Address = await server_address.plus(form)
            if (src && src.documentId) {
                funn.reset()
                pan_tooi.close_pan(pan_add.idx)
                func.fetching()
            }
        } 
    }),
    fetching: () => futuring(aii, async () => {
        const dts: Address[] = await server_address.mine()
        aii.items = dts
    }),
    init: () => promise(() => {
        func.fetching()
    })
}

nextTick(func.init)

const pan_add = { idx: 13, hui: <ElePanHui>{ opacity: 0.4 } }
</script>