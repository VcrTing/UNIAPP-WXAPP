<template>
    <view>
        <view class="">
            <view class="fx-i softer">
                <view class="btn-def py px-row ts c-p" v-for="(v, i) in tabs" :key="i"
                    @tap="funn.switchTab(v)"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                <view class="pb-row softer" v-for="(v, i) in aii.items" :key="i">
                 
                    <CoMoPublishTakeOffItem :v="v">
                        <view class="fx-r tis fs-s btn-err px-t" @tap="funn.redo(v)">
                            <text class="pi-s">
                                重复上架
                            </text>
                        </view>
                    </CoMoPublishTakeOffItem>
                   
                </view>
            </CoViDataLoading>
        </view>
        <!---->
        <OPan :idx="pan.idx">
            <OPanInnerY :idx="pan.idx" :orientation="'b'">
                <view class="py-x2">
                    <view class="fx-c"><text class="header-s ls">再次上架?</text></view>
                </view>
                <!-- v-if="product_tool.show_inv_many(choise)"
                 -->
                <view class="pb-x1" v-if="product_tool.show_inv_many(choise)">
                    <view class="px-row py fx-aii-btn-def"><view class="px-inp">库存类型是{{ DATA_PRODUCT_TYPED_INV_MANY.name }}，需要输入库存。</view></view>
                    <view class="py-s px-row"><input class="inp-app btn-def br-rnd" v-model="aii.inv" placeholder="请重新输入库存量"/></view>
                    <CkSpace :h="8"/>
                </view>

                <view class="px-row">
                    <view><OButton @tap="pan_tooi.close_pan(pan.idx)" color="def" clazz="btn-app">取消</OButton> </view>
                    <view class="py-s"></view>
                    <view><OButton @tap="func.submit" :ioading="aii.ioading" color="pri" clazz="btn-app">立即上架</OButton> </view>
                </view>
                <CkSpace :h="1"/>
            </OPanInnerY>
        </OPan>
        
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_PRODUCT_TYPED, DATA_PRODUCT_TYPED_INV_MANY, DATA_PRODUCT_TYPED_SM } from '@/conf/conf-datas';
import server_publish from '@/server/publish/server_publish';
import server_pubplus from '@/server/publish/server_pubplus';
import pan_tooi from '@/tool/app/pan_tooi';
import product_tool from '@/tool/modules/product_tool';
import { future, futuring, timeout } from '@/tool/util/future';
import CoMoPublishTakeOffItem from '@/wave/publish/component/CoMoPublishTakeOffItem.vue';
import { computed, nextTick, reactive, ref } from 'vue';

const pan = { idx: 20, hui: <ElePanHui>{ opacity: 0 } }
const tabs = DATA_PRODUCT_TYPED

// const prp = defineProps<{}>()
const aii = reactive({
    items: <Product[]>[ ], ioading: false,
    i: DATA_PRODUCT_TYPED_SM.v,
    param: { }, inv: 0
})

const choise = ref<Product>(<Product>{})

const funn = {
    switchTab: (v: Conf.Tab) => { aii.i = v.v },
    redo: (v: Product) => {
        choise.value = v; pan_tooi.open_def_b(pan.idx, pan.hui)
    },
}

const func = {
    submit: () => futuring(aii, async () => {
        const v: Product = await server_pubplus.takeon(choise.value, aii.inv)
        if (v && v.documentId) {
            pan_tooi.close_pan(pan.idx)
            await func.fetching()
        }
    }),
    fetching: async () => {
        const dts: Product[] = await server_publish.takeoff(aii.param)
        aii.items = dts || [ ]
    },
    init: () => futuring(aii, async () => {
        pan_tooi.close_pan(pan.idx)
        await func.fetching()
    })
}

nextTick(func.init)
</script>

        <!--
        <view>
            <view class="fx-r py-s softer">
                <view class="fx-r fx-aii-btn-def ts c-p" @tap="funn.openfilter">
                    <text class="pr-s py-row pi-x1 tit">
                        {{ tab['name'] }}
                    </text>
                    <OFI clazz="pr-row py-row" :i="'b'"/>
                </view>
            </view>
        </view>
        -->