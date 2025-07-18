<template>
    <view class="fx-i">
        <view class="o-h" :class="ispc ? 'w-22 h-11vh br-1' : 'w-22 h-9vh br-t'" @tap="emt('view', v.product)">
            <CoImg clazz="h-100" :src="product_tool.getcover(v.product).urlSmall"/>
        </view>
        <view class="fx-1">
            <view class="fx-s pb-s px fx-aii-btn-def py-s" @tap="emt('view', v.product)">
                <view class="fx-1">
                    <view  :class="isphone ? 'fs-w' : ''">{{ product_tool.gettitle(v.product) }}</view>
                </view>
                <view>

                </view>
            </view>
            <view class="mh-1em" @tap="emt('view', v.product)">
                <CoMoProductSubTitle :v="v.product" v-if="v.product" :clazz="'px'"/>
            </view>
            <view class="pr-s">
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
                    <!--
                    <Ov clazz="tis d-ib px fx-c py-s br">
                        <text class="fs-s">x</text>
                        <text class="h8">{{ cart_tool.getproduct_num(v) }}</text>
                    </Ov>
                    -->
                    <OFI @tap="emt('min', v)" i="trash" clazz="w-2em h-2em tiw fx-aii-btn-def fs-w"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import Ov from '@/cake/button/touch/Ov.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoMoProductSubTitle from '@/components/modules/product/inner/CoMoProductSubTitle.vue';
import cart_tool from '@/tool/modules/cart_tool';
import product_tool from '@/tool/modules/product_tool';

const prp = defineProps<{
    v: Page.CartDataOption,
    ispc: boolean,
    ispad: boolean,
    isphone: boolean
}>()

const emt = defineEmits([ 'add', 'min', 'view' ])
</script>