<template>
    <view class="">

        <view class="pt-x2 bg-con">
            
                <OScrollX>
                    <view class="d-ib pi-inp"></view>
                    <view class="w-28 h-12vh d-ib mr ps-r zi-t" v-for="(v, i) in aii.images" :key="i">
                        <view class="w-100 h-12vh fx-c abs-b i-0">
                            <CoImg clazz="h-100 w-100 br" :src="v"/>
                            <view class="abs-b r-0 zi-n" v-if="canedit">
                                <view class="px-s py-s bg-028 br-ti br-br">
                                    <UiI i='trash' clazz="c-fff op-618"/>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view v-if="canedit"
                        class="w-28 h-12vh br-s d-ib ps-r zi-t">
                        <OButtonDef clazz="h-100 fx-c abs-b i-0 w-100 br" :weak="true" @tap="funn.choseImg">
                            <view class="fs-n tiw">
                                <UiI :clazz="'d-ib'" :i="'+'"/>
                                <text class="px-s">添加优质</text>
                                <view>图片更吸引人</view>
                            </view>
                        </OButtonDef>
                    </view>
                </OScrollX>

            <CkInpItem class="pt-x2 pb-x1" :tit="''">
                <input class="inp-app h6" v-model="form.title" placeholder="请输入活动标题"/>
            </CkInpItem>
            <view class="pb-s">
                <view class="pi-inp pb">
                    <text>活动标签</text>
                    <text v-if="canedit" class="fs-s pi tis">({{ taglen }}/{{ form.taglimit }})</text>
                </view>
                <view class="pb pt-s" :class="taglen ? 'pi-inp' : ''">
                    <OScrollX>
                        <view class="" >
                            <view class="d-ib pr" v-for="(v, i) in form.tags" :key="i">
                                <OButtonDef :weak="true" clazz="fs-n tid pi br-s">
                                    <text>{{ v.name }}</text>
                                    <OButtonDef v-if="canedit" @tap="funn.trashTag(v)">
                                        <UiI clazz="d-ib fs-s" i="trash"/>
                                    </OButtonDef>
                                    <view class="d-ib py-s pr-s" v-else>
                                        &nbsp;
                                    </view>
                                </OButtonDef>
                            </view>
                            <view v-if="(taglen < form.taglimit) && canedit" class="d-ib px-inp" @tap="funn.ediTag">
                                <view class="btn-def w-2em fx-c h-2em br-cir"><UiI i="+"/></view>
                            </view>
                        </view>
                    </OScrollX>
                </view>
            </view>
        </view>
        <VwPpFormTagChoisePagePan :idx="pan_tag.idx" :form="form"/>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import mock_orders from '@/server/mock/order/mock_orders';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { arrfindi } from '@/tool/util/iodash';
import pan_tooi from '@/tool/app/pan_tooi';
import VwPpFormTagChoisePagePan from '../plus/pan/VwPpFormTagChoisePagePan.vue';
import { tipwarn } from '@/tool/uni/uni-global';
import { open_choise_img } from '@/tool/uni/uni-app';
import { future } from '@/tool/util/future';

const prp = defineProps<{
    form: ONE, canedit: boolean,
}>()

const taglen = computed(() => must_arr(prp.form.tags).length)

const aii = reactive({
    images: <string[]>[ ],
    choise: <MANY>[ ]
})

const funn = {
    choseImg: () => future(async () => {
        const res = await open_choise_img(3)
        console.log('res =', res)
        aii.choise = must_arr(res.tempFiles)
        aii.images = must_arr(res.tempFilePaths)
    }),
    trashTag: (v: ActivityTag) => {
        const i = arrfindi(prp.form.tags, v.id, 'id')
        prp.form.tags.splice(i, 1)
    },
    ediTag: () => {
        pan_tooi.open_def_r(pan_tag.idx)
    },

    vid: () => {
    }
}

defineExpose(funn)

const pan_tag = { idx: 41, hui: <ElePanHui> { opacity: 0.1 } }
</script>

                    <!--
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">黑丝</OButtonDef>
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">牵手约会</OButtonDef>
                    <OButtonDef :weak="true" clazz="fs-n px br-s mr">台球助教</OButtonDef>
                    <OButtonWht @tap="appRouter.chose_tags">
                        <UiI i='edit' clazz="tiw"/>
                    </OButtonWht>
                    -->

            <!--
            <view class="fx-i">
                <view class="w-80 h-16vh fx-c ps-r zi-t">
                    <CoImg clazz="h-100" :v="mock_orders.banner"/>
                    <view class="abs-b r-0">
                        <view class="px py bg-028">
                            <UiI i='edit' clazz="c-fff"/>
                        </view>
                    </view>
                </view>
                <OButtonDef clazz="w-25 h-16vh fx-c" :weak="true">
                    <view class="fs-n tiw">
                        <UiI clazz='d-ib' i='+'/>
                        <text class="px-s">添加</text>
                        <view>图片</view>
                    </view>
                </OButtonDef>
            </view>
            -->