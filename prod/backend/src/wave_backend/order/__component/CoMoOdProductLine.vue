<template>
    <view class="fx-i">
        <view class="w-18 h-8vh br-1 o-h">
            <CoImg clazz="h-100" @tap="emt('view', v)" :src="product_tool.getcover(v).urlSmall"/>
        </view>
        <view class="fx-1">
            <view class="fx-s mh-1em pb-s px">
                <view class="fx-1">
                    <view class="fs-w" @tap="emt('view', v)">{{ product_tool.gettitle(v) }}</view>
                </view>
                <view>
                    <view class="tiw">
                        <text class="fs-s">￥</text>
                        <text class="fs-w">{{ product_tool.getprice_less(v) }}</text>
                    </view>
                </view>
            </view>
            <view class="px pt-s">
                <view class="fx-s">
                    <view class="fx-1">
                        <view class="fs-t pb-col">
                            <view class="px-t br-1 btn-def d-ib">{{ product_tool.getinv_typed_txt(v) }}</view>
                            <view class="pi-s d-ib">库存: {{ v.inv }}, 虚拟: {{ v.invWeak }}</view>
                        </view>
                    </view>
                    <view class="">
                        <OButtonTag @tap="emt('takeon', v)" color="err" v-if="v.dataStatus === 4" clazz="px-t br-1 fx-c">
                            <text class="fs-t">下架</text>
                        </OButtonTag>
                        <OButtonTag v-else clazz="px-t br-1 fx-c">
                            <text class="fs-t">售卖中</text>
                        </OButtonTag>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import product_tool from '@/tool/modules/product_tool';
import { reactive } from 'vue';

const prp = defineProps<{
    v: Product
}>()

const aii = reactive({
    ioading: false, 
})

const emt = defineEmits([ 'view', 'takeon' ])

</script>