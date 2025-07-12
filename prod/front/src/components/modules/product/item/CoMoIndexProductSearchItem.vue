<template>
    <view class="">
        <view class="br o-h">
            
            <view class="ps-r zi-t">
                <view class="fx-aii-btn-def" @tap="emt('view', v)">
                    <view class="fx-i br" v-if="product_tool.getindex_banner(v, 3).length >= 3">
                        <view class="w-333 h-17vh d-ib o-h" v-for="(m, n) in product_tool.getindex_banner(v, 3)" :key="n">
                            <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                        </view>
                    </view>
                    <view class="fx-i br" v-if="product_tool.getindex_banner(v, 3).length <= 2">
                        <view class="w-50 h-17vh d-ib o-h" v-for="(m, n) in product_tool.getindex_banner(v, 3)" :key="n">
                            <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                        </view>
                    </view>
                    <view class="fx-i br" v-if="product_tool.getindex_banner(v, 3).length <= 0">
                        <view class="w-52 h-17vh d-ib o-h">
                            <view clazz="h-100 ani-scaie-aii ts"></view>
                        </view>
                    </view>
                </view>
                <view class="abs-b i-0 w-100 zi-s">
                    <view class="bf-wht-s bf fx-s" @tap="emt('view', v)">
                        <view class="pi-x1 ls-x2 py-s">
                            <text class="fs-s">{{ v.title }}</text>
                        </view>
                        <view class="px-row">
                            <view class="btn-wht-s br-t px-t fx-c" 
                                v-if="product_tool.is_sm(v)"
                                >
                                <text class="fs-t">￥</text>
                                <text class="fs-t">{{ product_tool.getprice_less(v) }}</text></view>
                            <view class="btn-wht-s br-t px-t fx-c" 
                                v-else
                                ><text class="fs-t">{{ product_tool.getnum_view(v) }}浏览</text></view>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import product_tool from '@/tool/modules/product_tool';
const prp = defineProps<{
    v: Product,
}>()

const emt = defineEmits([ 'view' ])


</script>
