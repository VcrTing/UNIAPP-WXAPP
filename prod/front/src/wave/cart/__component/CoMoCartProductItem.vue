<template>
    <view class="fx-i">
        <view class="w-22 h-9vh br-1 o-h" @tap="emt('view', v.product)">
            <CoImg clazz="h-100" :src="product_tool.getcover(v.product).urlSmall"/>
        </view>
        <view class="fx-1">
            <view class="fx-s mh-1em pb-s px fx-aii-btn-def py-s" @tap="emt('view', v.product)">
                <view class="fx-1">
                    <view class="fs-w">{{ product_tool.gettitle(v.product) }}</view>
                </view>
                <view>

                </view>
            </view>
            <view class="mh-1em" @tap="emt('view', v.product)">
                <CoMoProductSubTitle :v="v.product" v-if="v.product" :clazz="'px'"/>
            </view>
            <view class="pr">
                <view class="fx-s">
                    <view class="fx-1">
                        <Ov clazz="tiw d-ib px fx-c py-s br-1" @tap="emt('view', v.product)">
                            <text class="fs-s">￥</text>
                            <text class="h8">{{ cart_tool.getprice(v) }}</text>
                        </Ov>
                    </view>
                    <view class="">
                        <!--
                        <view class="fx-c fs-s bg-def br-s">
                            <view @tap="emt('min', v)" class="br-s w-2em h-2em btn-def-s fx-c">
                                <text class="h7">-</text></view>
                            <view class="br-s w-3em h-2em fx-aii-btn-def fx-c">
                                <text class="">{{ cart_tool.getproduct_num(v) }}</text></view>
                            <view @tap="emt('add', v)" class="br-s w-2em h-2em btn-def-s fx-c">
                                <text class="h7">+</text></view>
                        </view>
                        -->
                    </view>
                    <Ov clazz="tis d-ib px fx-c py-s br">
                        <text class="fs-s">x</text>
                        <text class="h8">{{ cart_tool.getproduct_num(v) }}</text>
                    </Ov>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import Ov from '@/cake/button/touch/Ov.vue';
import CkDefTag from '@/cake/visual/tag/CkDefTag.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoMoProductSubTitle from '@/components/modules/product/inner/CoMoProductSubTitle.vue';
import cart_tool from '@/tool/modules/cart_tool';
import product_tool from '@/tool/modules/product_tool';

const prp = defineProps<{
    v: Page.CartDataOption
}>()

const emt = defineEmits([ 'add', 'min', 'view' ])
</script>