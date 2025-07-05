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
                        <view>
                            <OButtonTag class="fx-s fs-t px-s br-t tiw" color="def">
                                <UiI class="" i='time'/>
                                <view class=" pi-s">{{ times.fmt(v.takeOffTime) }}<text class="pi-s">下架</text></view>
                            </OButtonTag>
                        </view>
                        <view class="pi-s"></view>
                        <view class="d-ib" v-if="!product_tool.is_free(v)">
                            <OButtonTag 
                                v-if="(inv <= 0)"
                                clazz="fs-t px-s br-1 tiw" color="def">售罄</OButtonTag>
                        </view>
                    </view>
                    <view class="px-s"></view>
                    <view class="fx-r tis fs-s">
                        <!--<UiI i='lock'/>-->
                    </view>
                </view>
                <view>
                    <slot>
                    </slot>
                </view>
            </view>
        </view>
        <view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_PUBLISH_BANNER_DEF } from '@/conf/conf-datas';
import product_tool from '@/tool/modules/product_tool';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: Product
}>()

const inv = computed((): number => {
    const inv = prp.v.inv;
    if (inv <= 0) return 0;
    if (product_tool.is_inv_infini(prp.v)) {
        return 9999
    }
    return 0
})

const funn = {
    get_banner_src: (v: Product): string => {
        const one: Media = must_one(product_tool.getbanner(v)[0]);
        return one.url || DATA_PUBLISH_BANNER_DEF.url
    }
}

</script>