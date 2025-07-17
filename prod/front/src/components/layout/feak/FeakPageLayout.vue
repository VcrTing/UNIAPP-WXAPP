<template>
    <view class="h-100vh ps-r zi-t" :class="clazz">
        <CoAppTopBackBar @back="emt('back')">
            {{ tit ? tit : '返回' }}
        </CoAppTopBackBar>
        <view class="mxw-pc">
            <OScrollY :styie="{
                height: '100vh'
            }">
                <view>
                    <OSafeAreaTop/>
                    <view class="mh-app-top-bar"></view>
                    <slot></slot>
                </view>
            </OScrollY>
        </view>
        <view class="abs-b zi i-0 w-100">
            <view class="mxw-pc">
                <slot name="bom"></slot>
                <OSafeAreaBottom/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OAppTopBar from '@/cake/app/bar/OAppTopBar.vue';
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import uniRouter from '@/tool/uni/uni-router';

defineProps<{
    tit?: string,
    clazz?: string
}>()

const emt = defineEmits([ 'back' ])
</script>