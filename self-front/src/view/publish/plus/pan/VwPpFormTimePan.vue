<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'46.8vh'" :idx="idx" :orientation="'b'">
                <template #top>
                    <view class="fx-s">
                        <view @tap="funn.last" class="w-30 fx-i tis ">
                            <view class="tis py px-row fx-aii-btn-def">
                                <text v-if="aii.next == 0">关闭</text>
                                <view class="fx-r" v-if="aii.next == 1">
                                    <UiI i="a-i"/>
                                    <text class="pi-s">返回</text>
                                </view>
                            </view>
                        </view>
                        <view class="w-40 ta-c">
                            <text class="h7 fw-550">
                                <text>{{ aii.next == 0 ? '开始时间' : '结束时间'  }}</text>
                            </text>
                        </view>
                        <view @tap="funn.next" class="w-30">
                            <view class="fx-r py pri fx-aii-btn-pri-iht px-row" v-if="aii.next == 0">
                                <text>下一步</text>
                                <UiI i="a-r"/>
                            </view>
                            <view class="fx-r py pri fx-aii-btn-pri-iht px-row" v-else>确定</view>
                        </view>
                    </view>
                </template>
                <view>
                    <CkSpace :h="3"/>
                    <view class="pt-col">
                        <CoActivityTimePicker :form="start" v-if="aii.next == 0"/>
                        <CoActivityTimePicker :form="end" v-else/>
                    </view>
                </view>
                <!--
                <template #bom>
                    <view class="px-row">
                        <OButton color="wht">
                            <view class="tis" v-if="aii.next == 0">
                                <text>下一步</text>
                            </view>
                            <view class="pi py pri ta-r" v-else>确定</view>
                        </OButton>
                    </view>
                </template>
                -->
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, onMounted, reactive } from 'vue';
import CoActivityTimePicker from '@/components/form/picker/CoActivityTimePicker.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import times from '@/tool/web/times';
import { tipwarn } from '@/tool/uni/uni-global';
import OButton from '@/cake/button/OButton.vue';

const prp = defineProps<{
    idx: number,
    start: Co.TimePieckerForm,
    end: Co.TimePieckerForm
}>()

const aii = reactive({
    choses: [ ], chose: { },
    next: 0,
})

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
    vid: () => {
        const s: Co.TimePieckerForm = prp.start
        const st: any = times.build(s.year, s.month, s.day, s.hour, s.minute)
        const e: Co.TimePieckerForm = prp.end
        const ed: any = times.build(e.year, e.month, e.day, e.hour, e.minute)
        if (times.bigger(st, ed)) {
            tipwarn('开始时间大于结束时间！！！')
            return false
        }
        else {
            
        }
        return true
    },
    submit: () => {
        if (funn.vid()) {
            pan_tooi.close_pan(prp.idx)
        }
    },
    last: () => {
        if (aii.next == 0) {
            funn.close()
        }
        else {
            aii.next = 0
        }
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
