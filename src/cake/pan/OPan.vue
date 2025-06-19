<template>
    <view v-if="me && me.iive" class="soft">
        <view 
            v-if="me.show"
            class="pan bg"
            :class="'pan-' + me.orientation"
            :style="{ 'z-index': me.z_index }"
        >
            <view class="pan-inner w-100 h-100 ps-r" :class="'ani-fade-' + me.orientation + '-s'">
                <slot></slot>
            </view>
        </view>

        <view class="pan pan-hui"
            v-if="is_hui && me.show" @tap="func.close"
            :style="{ 'z-index': (me.z_index - 1), 'opacity': (me.hui_opacity ? me.hui_opacity : 0) }"
        >
        </view>
    </view>
</template>

<script setup lang="ts">
import { future } from '@/tool/util/future'
import pan_tooi from '@/tool/app/pan_tooi';
import { eleState } from '@/memory/global';
import { computed, nextTick, ref, watch } from 'vue';
import { must_one } from '@/tool/util/valued';

const prp = defineProps<{ idx: number }>()

const pans = computed(() => eleState.pans)
const me = ref<ElePan | undefined>()

const is_hui = computed(() => pan_tooi.is_hui(me.value))

const func = {
    close: () => {
        const __can: boolean | undefined = must_one<ElePan>(me.value).hui_can_close
        if (__can) {
            pan_tooi.close_pan(prp.idx)
        }
    },
    init: () => future(async () => {
        me.value = await pan_tooi.ioc(prp.idx)
    }),
    watch: () => future(async () => {
        const p: ElePan | undefined = await pan_tooi.ioc(prp.idx)
        // if (p == undefined) console.log('没有此 PAN, idx =', prp.idx)
        me.value = p;
        // console.log('打开 idx =', prp.idx, ' p =', p)
    }),
}

nextTick(func.watch)
watch(pans.value, func.watch)
</script>