<template>
    <view v-if="v">
        <view class="fx-s fx-b fx-aii-btn-def px-inp py">
            <view class="w-15 h-6vh ani-scaie-aii-x2">
                <CoImg v-if="product_tool.getcover(v).url" 
                    clazz="h-100 br-t o-h" :src="product_tool.getcover(v).url"/>
                <view v-else class="w-100 h-100 btn-def br-t"></view>
            </view>
            <view class="fx-1 px">
                <view class="fx-1 mh-2em">
                    <view><text class="fs-w">{{ product_tool.gettitle(v) }}</text></view>
                </view>
                <view class="">
                    <view class="tiw">
                        <text class="fs-s">￥</text>
                        <text>{{ cart_tool.getprice(cart) }}</text>
                    </view>
                </view>
            </view>
            <view class="tis">
                <view><text class="fs-w">x</text><text class="">{{ cart_tool.getproduct_num(cart) }}</text></view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import cart_tool from '@/tool/modules/cart_tool';
import product_tool from '@/tool/modules/product_tool';

const prp = defineProps<{
    v: Product | undefined,
    cart: Page.CartDataOption
}>()
</script>