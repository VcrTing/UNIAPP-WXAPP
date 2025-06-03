<template>
    <view class="">
        <view class="">
            <!--<view class="header-s py">基本资料</view>-->
            <view class="fx-i">
                <view class="w-80 h-16vh fx-c ps-r zi-t">
                    <CoImg clazz="h-100" :v="mock_orders.banner"/>
                    <view class="abs-b r-0">
                        <view class="px py bg-028">
                            <UiI i='trash' clazz="c-fff"/>
                        </view>
                    </view>
                </view>
                <OButtonDef clazz="w-333 h-12vh fx-c br-s" :weak="true">
                    <view class="fs-n tiw">
                        <UiI :clazz="'d-ib'" :i="'+'"/>
                        <text class="px-s">添加优质</text>
                        <view>图片更吸引人</view>
                    </view>
                </OButtonDef>
            </view>
            <view class="bg-con">
                <CkInpItem class="pt-x2 pb" :tit="''">
                    <OInput :def="form.title" @result="(v) => form.title = v" 
                        class="h6" :pchd="'请输入活动标题'"/>
                </CkInpItem>
                <view class="pt pb">
                    <view class="pi-inp pb">
                        <text>标签</text>
                        <text class="fs-s pi tis">({{ taglen }}/{{ form.taglimit }})</text>
                    </view>
                    <view class="mh-inp " :class="taglen ? 'pi-inp' : ''">
                        
                        <OScrollX>
                            <view class="" >
                                <view class="d-ib pr" v-for="(v, i) in form.tags" :key="i">
                                    <OButtonDef :weak="true" clazz="fs-n tid pi br-s">
                                        <text>{{ v.name }}</text>
                                        <OButtonDef @tap="funn.trashTag(v)">
                                            <UiI clazz="d-ib fs-s" i="trash"/>
                                        </OButtonDef>
                                    </OButtonDef>
                                </view>
                                <view v-if="taglen < form.taglimit" class="d-ib px-inp" @tap="funn.ediTag">
                                    <view class="btn-def w-2em fx-c h-2em br-cir"><UiI i="+"/></view>
                                </view>
                            </view>
                        </OScrollX>
                    </view>
                </view>
            </view>
            <VwPpFormTagChoisePagePan :idx="pan_tag.idx" :form="form"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import CoImg from '@/components/media/img/CoImg.vue';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { must_arr } from '@/tool/util/valued';
import VwPpFormTagChoisePagePan from './pan/VwPpFormTagChoisePagePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';

// const prp = defineProps<{}>()
const form = reactive({
    title: '', tags: <ActivityTag[]>[ ], taglimit: 3
})

const taglen = computed(() => must_arr(form.tags).length)

const emt = defineEmits([ 'refresh' ])

const funn = {
    trashTag: (v: ActivityTag) => {
        const i = arrfindi(form.tags, v.id, 'id')
        // console.log('删掉 =', i)
        form.tags.splice(i, 1)
    },
    ediTag: () => {
        pan_tooi.open_def_r(pan_tag.idx)
    },
    v: () => {
        return form
    }
}

const func = {
    refresh: () => emt('refresh')
}

defineExpose(funn)

const pan_tag = { idx: 41, hui: <ElePanHui> { opacity: 0.1 } }

</script>