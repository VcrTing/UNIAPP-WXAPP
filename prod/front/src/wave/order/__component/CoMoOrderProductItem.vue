<template>
    <view class="fx-i" @tap="emt('view', v)">
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
                <view class="fx-s fx-b">
                    <view class="fx-1">
                        <view class="tis">
                            <text class="fs-n">{{ cart_tool.getproduct_num(v) }}</text>
                            <text class="fs-s">件</text>
                        </view>
                    </view>
                    <view class="">
                        <view class="tiw">
                            <text class="fs-s">￥</text>
                            <text class="fs-w">{{ cart_tool.getproducts_price(v) }}</text>
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

const emt = defineEmits([ 'view' ])
</script>