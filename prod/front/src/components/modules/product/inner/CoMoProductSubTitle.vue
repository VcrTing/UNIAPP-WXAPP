<template>
    <view>
        
        <view class="fs-s py-s fx-aii-btn-def" v-if="product_tool.has_title_sub(v)"
            :class="clazz"
        >
            <view v-if="is_json(v)">
                <text
                    :class="product_tool.gettitle_sub_json(v).clazz"
                >{{ product_tool.gettitle_sub_json(v).v }}</text>
            </view>
            <view class="aoc" v-else>
                {{ product_tool.gettitle_sub_txt(v) }}&nbsp;
            </view>
        </view>
        <!--
        <view class="fs-s py-s fx-aii-btn-def" v-else
            :class="clazz"
        >
            <view class="sus">
                近期多人关注&nbsp;
            </view>
        </view>
        -->
    </view>
</template>

<script setup lang="ts">
import product_tool from '@/tool/modules/product_tool';
import { is_json } from '@/tool/util/typed';

const prp = defineProps<{
    v: Product,
    clazz?: string
}>()
</script>