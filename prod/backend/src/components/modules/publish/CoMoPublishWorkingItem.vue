<template>
    <view class="fx-i" @tap="emt('view', v)">
        <view class="fx-1 h-10vh br-1 o-h">
            <CoImg clazz="h-100" :src="product_tool.getcover(v).urlSmall"/>
        </view>
        <view class="w-76">
            <view class="mh-1em fx-s pb-s px">
                <view class="fx-1">
                    <view class="fs-w"><text class="eiies o-h">{{ product_tool.gettitle(v) }}</text></view>
                </view>
                <view>

                </view>
            </view>
            <view class="mh-1em">
                <CoMoProductSubTitle :v="v" v-if="v" :clazz="'px'"/>
            </view>
            <view class="mh-1em px">
                <view class="fx-s fx-b">
                    <view class="fx-1" v-if="product_tool.is_free(v)">
                        <view class="fs-n tiw">
                            <!--
                            <UiI i="eye" clazz="d-ib"/>
                            -->
                            <text class="pr-t">{{ product_tool.getnum_view(v) }}</text>
                            <text class="fs-s">人浏览</text>
                        </view>
                    </view>
                    <view class="fx-1" v-else>
                        <view class="money d-ib">
                            <text class="fs-s">￥</text>
                            <text class="">{{ product_tool.getprice_less(v) }}</text>
                        </view>
                        <view class="pi-s d-ib"></view>
                        <view class="tiw d-ib td-lt">
                            <text class="fs-s">￥</text>
                            <text class="fs-s">{{ product_tool.getprice_must(v) }}</text>
                        </view>
                    </view>
                    <view class="">
                        <!--
                        <view class="tiw fs-t">
                            <UiI i="time" clazz="d-ib"/>
                            <text class="pi-s">{{ times.fmts(v.createdAt) }}</text>
                        </view>
                        -->
                        <OButtonTag clazz="fx-c px-t fs-t tiw br-1" color="def-s">
                            <UiI i="eye"/><text>{{ product_tool.getnum_view(v) }}</text>
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
import CoMoProductSubTitle from '@/components/modules/product/inner/CoMoProductSubTitle.vue';
import cart_tool from '@/tool/modules/cart_tool';
import product_tool from '@/tool/modules/product_tool';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: Product
}>()

const emt = defineEmits([ 'view' ])
</script>