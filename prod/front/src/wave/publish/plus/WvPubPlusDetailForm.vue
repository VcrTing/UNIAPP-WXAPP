<template>
    <view class="">
        <view class="bg-con pt-col">
            <view class="">
                <CkInpItem :tit="'商品类型'">
                    <view class="fx-r mh-inp pr-inp">
                        <view v-for="(v, i) in typed" :key="i" @tap="form.typed = v.v">
                            <OButton :color="form.typed == v.v ? 'pri' : 'wht'" :weak="true"
                                :clazz="'fs-s py-s br-t ' + (form.typed == v.v ? 'px-x1 mi' : 'mi tiw')">
                                <text class="">{{ v.name }}</text>
                            </OButton>
                        </view>
                    </view>
                </CkInpItem>
            </view>
            <!--  v-if="form.typed == DATA_ACTIVITY_TYPED_GK.v" -->
            <view class="py px-inp fx-aii-btn-def" v-if="form.typed == DATA_PRODUCT_TYPED_FREE.v">
                <view class="pi tid fs-n pb-col">
                    <view>公开品是公开访问的商品，免费性质，并不会收取用户的金钱。</view>
                    <view class="py-t"></view>
                    <view>您可以发布优质的公开品，将用户引流到您别的社交账号内。</view>
                </view>
            </view>
            <view class="" v-if="form.typed == DATA_PRODUCT_TYPED_SM.v">

                <CkInpItem :tit="'商品价格'" :clazz_tit="'tid'">
                    <input class="inp-app ta-r"
                        v-model="form.price" placeholder="商品的售卖价格(￥)"/>
                </CkInpItem>
                
                <CkInpItem :tit="'库存类型'">
                    <view class="fx-r mh-inp pr-inp">
                        <view v-for="(v, i) in inv_typed" :key="i" @tap="form.inv_typed = v.v">
                            <OButton :color="form.inv_typed == v.v ? 'def' : 'wht'" :weak="true"
                                :clazz="'fs-s py-s br-rnd ' + (form.inv_typed == v.v ? 'px mi' : 'mi tiw')">
                                <text>{{ v.name }}</text>
                            </OButton>
                        </view>
                    </view>
                </CkInpItem>

                <view class="fx-aii-btn-def">
                    <view class="ta-c px-inp pt pb-x1">
                        <text class="fs-s tin">{{ inv_typed_now.desc }}</text>
                    </view>
                </view>

                <CkInpItem v-if="form.inv_typed == DATA_PRODUCT_TYPED_INV_MANY.v" :tit="'库存数量'" :clazz_tit="'tid'">
                    <input class="inp-app ta-r" v-model="form.inv" type="number" placeholder="商品的库存数量"/>
                </CkInpItem>
            </view>
        </view>
        <!-- -->
        <!-- -->
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButton from '@/cake/button/OButton.vue';
import { DATA_PRODUCT_TYPED, DATA_PRODUCT_TYPED_SM, DATA_PRODUCT_TYPED_FREE, DATA_PRODUCT_TYPED_INV, DATA_PRODUCT_TYPED_INV_INFINI, DATA_PRODUCT_TYPED_INV_MANY } from '@/conf/conf-datas';

const form = reactive({
    typed: DATA_PRODUCT_TYPED_SM.v, inv_typed: DATA_PRODUCT_TYPED_INV_INFINI.v,
    price: undefined, inv: undefined,
    //
    addrdata: <Address>{ }, 
    __start: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    __end: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
})

const inv_typed_now = computed((): Conf.Tab => {
    const i: number = form.inv_typed || DATA_PRODUCT_TYPED_INV_INFINI.v;
    let res: Conf.Tab = DATA_PRODUCT_TYPED_INV_INFINI;
    inv_typed.map((e) => {
        if (e.v === i) {
            res = e
        }
    })
    return res
})

const funn = {
    vid: () => { return true },
    v: () => {
        if (funn.vid()) { return form }
        return null
    }
}

defineExpose(funn)

const typed = DATA_PRODUCT_TYPED // computed(() => DATA_PRODUCT_TYPED)
const inv_typed = DATA_PRODUCT_TYPED_INV

</script>

