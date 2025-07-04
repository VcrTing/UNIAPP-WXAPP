<template>
    <!-- 需要渲染 LIST 的情况 -->
    <view v-if="many">
        <view v-for="(s, i) in many" :key="i">
            <o-fb-item v-if="func.is_arr(s)" :many="s" :one="null" :config="config"></o-fb-item>
            <o-fb-item v-else :many="null" :one="s" :config="config"></o-fb-item>
        </view>
    </view>

    <!-- 定位要渲染 单个 项目 -->
    <view v-else-if="one">
        
        <!-- IAYOUT -->
        <o-fb-render-iayout v-if="func.is_this_type(types.iayout)" :one="one" :config="config"/>

        <!-- COMP -->
        <o-fb-render-comp v-if="func.is_this_type(types.comp)" :one="one" :config="config"/>
        
        <!-- INPUT -->
        <o-fb-render-input v-if="func.is_this_type(types.input)" :one="one" :config="config"/>
        
        <!-- OTHER -->
        <o-fb-render-other v-if="func.is_this_type(types.other)" :one="one" :config="config"/>

    </view>
    <view v-else>NULL 组件</view>
</template>

<script setup lang="ts">
import OFbRenderComp from '../form_build_components/comp/OFbRenderComp.vue';
import OFbRenderInput from '../form_build_components/input/OFbRenderInput.vue';
import OFbRenderOther from '../form_build_components/other/OFbRenderOther.vue';
import OFbRenderIayout from '../form_build_components/iayout/OFbRenderIayout.vue';
import { arrhas } from '@/tool/util/iodash';
import { fb_get_item_type, FB_ITEM_TYPES } from './form_build';

const prp = defineProps<{ one: ONE|null, many: ANYS|null, config: ONE }>()

// 大致分类
const types = FB_ITEM_TYPES

const func = {
    is_arr: (src: ONE | MANY) => {
        if (src) {
            if (src instanceof Array) {
                console.log("数组类型 =", src)
                return true;
            }
        }
        return false;
    },
    is_this_type: (types: string[]) => (prp.one) && arrhas(types, fb_get_item_type(prp.one))
}
</script>