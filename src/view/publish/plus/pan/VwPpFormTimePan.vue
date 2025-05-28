<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'46.8vh'" :idx="idx" :orientation="'b'">
                <template #top>
                    <view class="fx-s">
                        <OButtonWht @tap="funn.close" clazz=""><view class="pr py">取消</view></OButtonWht>
                        <view class="py"><text class="h7 fw-550">活动时间</text></view>
                        <OButtonWht @tap="funn.next"><view class="pi py pri">确定</view></OButtonWht>
                    </view>
                </template>
                <view>
                    <CkSpace :h="3"/>
                    <view class="pt-col">
                        <CoDatePicker :def="aii.dt" v-if="aii.next == 0"/>
                        <CoTimePicker :def="aii.tim" v-else/>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButtonWht from '@/cake/button/OButtonWht.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { storage } from '@/tool/web/storage';
import { computed, nextTick, onMounted, reactive } from 'vue';
import CoDatePicker from '@/components/form/picker/CoDatePicker.vue';
import CoTimePicker from '@/components/form/picker/CoTimePicker.vue';
import { timeout } from '@/tool/util/future';
import pan_tooi from '@/tool/app/pan_tooi';

const prp = defineProps<{
    idx: number
}>()

const aii = reactive({
    choses: [ ], chose: { },
    next: 0,
    dt: '2025-12-12', tim: '23:23'
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
    v: () => (''),
    reset: () => { },
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

const code = computed(() => {
    return storage.get('publish_plus_pan_content_code') || 0
})

onMounted(funn.init)
</script>
