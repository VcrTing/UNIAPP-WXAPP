<template>
    <view class="fx-i">
        <view class="w-22 h-9vh br-1 o-h">
            <CoImg clazz="h-100" :src="product_tool.getcover(v.product).urlSmall"/>
        </view>
        <view class="fx-1">
            <view class="fx-s mh-1em pb-s px">
                <view class="fx-1">
                    <view class="fs-w">{{ product_tool.gettitle(v.product) }}</view>
                </view>
                <view>

                </view>
            </view>
            <view class="mh-1em">
                <CoMoProductSubTitle :v="v.product" v-if="v.product" :clazz="'px'"/>
            </view>
            <view class="px">
                <view class="fx-s">
                    <view class="fx-1">
                        <view class="tiw">
                            <text class="fs-s">￥</text>
                            <text class="h8">{{ cart_tool.getprice(v) }}</text>
                        </view>
                    </view>
                    <view class="">
                        <view class="fx-c fs-s bg-def br-s">
                            <view @tap="emt('min', v)" class="br-s w-2em h-2em btn-def-s fx-c">
                                <text class="h7">-</text></view>
                            <view class="br-s w-3em h-2em fx-aii-btn-def fx-c">
                                <text class="">{{ cart_tool.getproduct_num(v) }}</text></view>
                            <view @tap="emt('add', v)" class="br-s w-2em h-2em btn-def-s fx-c">
                                <text class="h7">+</text></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import CoMoProductSubTitle from '@/components/modules/product/inner/CoMoProductSubTitle.vue';
import cart_tool from '@/tool/modules/cart_tool';
import product_tool from '@/tool/modules/product_tool';

const prp = defineProps<{
    v: Page.CartDataOption
}>()

const emt = defineEmits([ 'add', 'min' ])
</script>