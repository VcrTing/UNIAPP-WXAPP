<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'61.8vh'" :idx="idx" :orientation="'b'">
                <template #top>
                </template>
                <view class="">
                    <view class="">

                        <view class="ps-r zi-t">
                            <view class="h-14vh o-h">
                                <CoImg clazz="h-14vh o-h" :src="mock_meizi.background"/>
                            </view>
                            <view class="abs-b i-0 px-row py-row">
                                <view class="fx-i bg-con h-3em br-rnd">
                                    <CkAvatar clazz="w-3em h-3em" :id="0" :src="meizi.avatar"/>
                                    <view class="px">
                                        {{ meizi.name }}
                                    </view>
                                </view>
                            </view>
                        </view>

                        <view class="py">
                            <view class="ta-c fx-s px-row">
                                <view class="w-20"></view>
                                <view class="money fx-c fx-b fx-1">
                                    <view class="fw-550">￥&nbsp;</view>
                                    <view class="h2 fw-700">0.00</view>
                                    <view class="fw-550">&nbsp;&nbsp;</view>
                                    <view>
                                        <text class="fs-s">(累计打赏金额)</text>
                                    </view>
                                </view>
                                <view class="w-0">
                                </view>
                            </view>
                        </view>
                        <view class="pt-s bg-def"></view>
                        <view class="py-row" v-if="aii.next == 0">
                            <view class="px-inp">
                                <text>打赏(￥)</text>
                            </view>
                            <view class="py px-row">
                                <view class="ps-r zi-t">
                                    <OInput clazz_input="h7 ta-c mh-inp-x1 err fx-aii-btn-def br-rnd" pchd="请输入本次打赏金额"/>
                                    <!--
                                    <view class="abs-r t-0">
                                        <OButtonDef clazz="">打赏</OButtonDef>
                                    </view>-->
                                </view>
                            </view>
                        </view>
                        <view class="py-row" v-else>
                            <view class="px-row pt">
                                <view class="btn-succ br mh-6em fx-c ps-r zi-t">
                                    <view>
                                        <view class="h5 fx-c">
                                            <UiI clazz="" i="check"/>
                                            <text class="pi-s">打赏成功</text>
                                        </view>
                                    </view>
                                    <view class="abs-r t-0">
                                        <OButton @tap="funn.reset" clazz="w-2em h-2em br-cir" color="succ" :weak="true">
                                            <UiI clazz="h6" i="x"/>
                                        </OButton>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <template #bom>
                    <view class="px-row">
                        <OButton v-if="aii.next == 0" clazz="btn-app" @tap="funn.next">
                            打赏
                        </OButton>
                        <OButtonDef v-else clazz="btn-app" @tap="funn.next">
                            确定
                        </OButtonDef>
                        <view class="py-s"></view>
                        <OButtonDef clazz="btn-app" @tap="pan_tooi.close_pan(idx)">
                            关闭
                        </OButtonDef>
                    </view>
                </template>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, onMounted, reactive } from 'vue';
import { timeout } from '@/tool/util/future';
import pan_tooi from '@/tool/app/pan_tooi';
import mock_meizi from '@/server/mock/user/mock_meizi';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    idx: number
}>()

const aii = reactive({
    next: 0,
})

const meizi = mock_meizi.items[0]

const emt = defineEmits([ 'result', 'x' ])

const funn = {
    next: () => {
        if (aii.next == 0) {
            aii.next = 1
        }
        else {
            funn.submit()
        }
    },
    v: () => (''),
    reset: () => { aii.next = 0 },
    submit: () => {
        emt('result', funn.v())
        timeout(() => funn.reset())
    },
    close: () => {
        pan_tooi.close_pan(prp.idx)
    },
    init: () => {
        aii.next = 0
    },
}

onMounted(funn.init)
</script>


                    <!--
                    <CkSpace :h="3"/>
                    <view class="fx-s">
                        <OButtonWht @tap="funn.close" clazz=""><view class="pr py">取消</view></OButtonWht>
                        <view class="py"><text class="h7 fw-550">活动时间</text></view>
                        <OButtonWht @tap="funn.next"><view class="pi py pri">确定</view></OButtonWht>
                    </view>
                    -->