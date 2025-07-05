<template>
    <view class="card fx-s o-h c-p">
        <view class="w-5em h-5em">
            <CoImg clazz="h-100" :src="funn.get_banner_src(v)"/>
        </view>
        <view class="fx-1 px">
            <view class="pt-s fx-s">
                <view><text class="h9 ls">{{ v.title }}</text></view>
                <view>
                    <!--
                    <OButtonTag color="def" clazz="fs-t px-s br-t tid" v-if="product_tool.is_free(v)">{{ DATA_PRODUCT_TYPED_FREE.name }}</OButtonTag>
                    <OButtonTag color="def" clazz="fs-t px-s br-t tid" v-else>{{ DATA_PRODUCT_TYPED_SM.name }}</OButtonTag>
                    -->
                </view>
            </view>
            <view class="fx-s pt">
                <view class="fx-1 fx-i">
                    <view class="fx-i">
                        <UiI class="fs-n" i='time'/>
                        <view class="fs-n pi-s tis">{{ times.fmt(v.createdAt) }}<text class="px-s">创建</text></view>
                    </view>
                    <view class="px-s"></view>
                    <view class="fx-r tis fs-s">
                        <!--<UiI i='lock'/>-->
                        
                    </view>
                </view>
                <view>
                    <slot>
                        <!--
                        <view class="fx-r tis fs-s btn-err px-t">
                            <text class="pi-s">
                                {{ product_tool.gettyped_txt(v) }}
                            </text>
                        </view>
                        -->
                    </slot>
                </view>
            </view>
        </view>
        <view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_PUBLISH_BANNER_DEF } from '@/conf/conf-datas';
import product_tool from '@/tool/modules/product_tool';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: Product
}>()

const funn = {
    get_banner_src: (v: Product): string => {
        const one: Media = must_one(product_tool.getbanner(v)[0]);
        return one.url || DATA_PUBLISH_BANNER_DEF.url
    }
}

</script>