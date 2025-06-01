<template>
    <view class="ps-r zi-n">
        <view class="bg-con py">
            <VwIndexTags/>
            <view class="px-row pt">
                <view class="">
                    <view>
                        <OButtonDef @tap="funn.switchLocation" clazz="px-row br-rnd py-t tid" :weak="true" :color="'def-s'">深圳市</OButtonDef>
                    </view>
                </view>
            </view>
        </view>
        <view class="pt-row">
            <OScrollY :styie="{
                'height': 'calc( 100vh - 15em )'
            }">
                <view class="px-row">
                    <VwIndexContList/>
                </view>
                <view class="mh-5em"></view>
            </OScrollY>
        </view>
        <VwIndexLocationPan :idx="aii.pan_location_idx"/>
    </view>
</template>
 
<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { computed, reactive } from 'vue';
import VwIndexContList from './content/VwIndexContList.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import VwIndexLocationPan from './pan/VwIndexLocationPan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import VwIndexTags from './content/VwIndexTags.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    pan_location_idx: 2, pan_hui: <ElePanHui>{ opacity: 0.4 },
    tag: 0
})

const funn = {
    switchLocation: () => {
        pan_tooi.open_def_t(aii.pan_location_idx, aii.pan_hui)
    }
}
</script>