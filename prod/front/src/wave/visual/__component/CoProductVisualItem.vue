<template>
    <view>
        <view class="br o-h">
            <!-- -->
            <view v-if="product_tool.getindex_banner(v, 3).length === 3">
                <view class="w-333 d-ib" v-for="(m, n) in product_tool.getindex_banner(v, 3)">
                    <CoImg clazz="w-100 h-13vh" :src="m.urlSmall"/>
                </view>
            </view>
            <view v-else-if="product_tool.getindex_banner(v, 3).length === 2">
                <view class="w-42 d-ib" v-for="(m, n) in product_tool.getindex_banner(v, 3)">
                    <CoImg clazz="w-100 h-13vh" :src="m.urlSmall"/>
                </view>
            </view>
            <view v-else-if="product_tool.getindex_banner(v, 3).length === 1">
                <view class="w-618 d-ib" v-for="(m, n) in product_tool.getindex_banner(v, 3)">
                    <CoImg clazz="w-100 h-13vh" :src="m.urlSmall"/>
                </view>
            </view>

            <!-- -->
            <view class="bg-con">
                <view class="px-col pt-col pb-t fx-aii-btn-def">
                    <text>{{ v.title }}</text>
                </view>
                <view class="fx-aii-btn-def">
                    <view class="fx-s px-col py-s">
                        <view>
                            <view class="d-ib">
                                <OButtonTag color="def" class="fx-c px-t br-1 fs-t mr">{{ product_tool.getinv_typed_txt(v) }}</OButtonTag>
                            </view>
                            <view class="d-ib" v-for="(j, k) in v.tags" :key="k">
                                <OButtonTag color="def" class="fx-c px-t br-1 fs-t mr-s">{{ j.name }}</OButtonTag>
                            </view>
                        </view>
                        <view class="fx-r">
                            <view class="fx-r tis fs-s">
                                <UiI i="eye"/>
                                <text>{{ product_tool.getnum_view(v) }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import product_tool from '@/tool/modules/product_tool';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import UiI from '@/ui/element/i/UiI.vue';
import CoImg from '@/components/media/img/CoImg.vue';

//
const prp = defineProps<{
    v: Product
}>()

</script>