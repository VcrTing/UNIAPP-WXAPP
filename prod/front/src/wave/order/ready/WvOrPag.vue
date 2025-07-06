<template>
    <view class="">
        <view>
            <view class="bg-con">
                <view class="px-inp pt-s fw-550">
                    <text class="fs-w">下单列表&nbsp;</text>
                    <text>({{ num }})</text>
                </view>
                <view v-for="(v, i) in carts" :key="i" class="py">
                    <CoMoOrderProductItem v-if="getp(v)" :v="getp(v)" :cart="v"/>
                </view>
            </view>
            <view class="py-s"></view>
            <view class="bg-con">
                <view class="pt">
                    <CoMoOrderMsgLine :tit="'金额总计'">
                        <view class="money">
                            <text>￥</text>
                            <text class="h7 fw-550">{{ price }}</text>
                        </view>
                    </CoMoOrderMsgLine>
                    <CoMoOrderMsgLine :tit="'下单时间'">
                        <text>{{ times.fmts(new Date()) }}</text>
                    </CoMoOrderMsgLine>
                    <CoMoOrderMsgLine :tit="'支付方式'" :clazz="'fx-t'">
                        <view>
                            <view v-for="(v, i) in DATA_PAYMENT_WAY" :key="i"
                                class="" @tap="funn.choise_payway(v)"
                            >
                                <view class="fx-r fx-aii-btn-def pb-s">
                                    <view class="fx-r" :class="funn.iive_payway(v) ? '' : 'fs-n'">
                                        <view class="px tiw">{{ v.name }}</view>
                                        <view class="w-1em h-1em h5 br-s o-h">
                                            <CoImg clazz="h-100" :src="v.cover"/>
                                        </view>
                                    </view>
                                    <view class="pi"></view>
                                    <OCheckBox :clazz="'fs-s'" :iive="funn.iive_payway(v)"/>
                                </view>
                            </view>
                        </view>
                    </CoMoOrderMsgLine>
                </view>
            </view>
            <view class="py-s"></view>
            <view class="bg-con">
                <CoMoOrderMsgLine :tit="'所属客服'" :clazz="'fx-t'">
                    <view v-if="info.contacts">
                        <view v-for="(v, i) in info.contacts" :key="i" 
                            :class="info.contacts.length > 1 ? 'pb' : ''"
                        >
                            <CoMoContactBlock :v="v"/>
                        </view>
                    </view>
                </CoMoOrderMsgLine>
                
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OCheckBox from '@/cake/input/check/OCheckBox.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_PAYMENT_WAY } from '@/conf/conf-datas';
import { appState } from '@/memory/global';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import { computed, reactive } from 'vue';
import CoMoContactBlock from '../__component/block/CoMoContactBlock.vue';
import CoMoOrderProductItem from '../__component/product/CoMoOrderProductItem.vue';
import CoMoOrderMsgLine from '../__component/block/CoMoOrderMsgLine.vue';

const prp = defineProps<{
    carts: Page.CartDataOptions, num: number, price: number, aii: ONE
}>()

const info = computed((): AppInfo => must_one(appState.info))

const getp = (cart: Page.CartDataOption): Product | undefined => ( cart.product )

const funn = {
    iive_payway: (v: ONE) => ( v.code === prp.aii.payway ),
    choise_payway: (v: ONE) => {
        prp.aii.payway = v.code
    }
}

</script>