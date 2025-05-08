<template>
    <view v-if="me && me.iive" class="soft">
        <view 
            v-if="me.show"
            class="pan bg"
            :class="'pan-' + me.orientation"
            :style="{ 'z-index': me.z_index }"
            >
            <view class="pan-inner w-100 h-100 ps-r">
                <slot></slot>
            </view>
        </view>

        <view class="pan pan-hui soft"
            v-if="is_hui && me.show"
            @tap="pan_tooi.close_pan(idx)"
            :style="{ 'z-index': (me.z_index - 1), 'opacity': (me.hui_opacity ? me.hui_opacity : 0.4) }"
        ></view>

    </view>
</template>

<script setup lang="ts">
import { future } from '@/tool/util/future'
import pan_tooi from '@/tool/app/pan_tooi';
import { eleState } from '@/memory/global';

const prp = defineProps<{ idx: number }>()

const pans = computed(() => eleState.pans)
const me = ref<ElePan | undefined>()

const is_hui = computed(() => pan_tooi.is_hui(me.value))

const func = {
    init: () => future(async () => {
        me.value = await pan_tooi.ioc(prp.idx)
    }),
    watch: () => future(async () => {
        const p: ElePan | undefined = await pan_tooi.ioc(prp.idx)
        if (p == undefined) console.log('没有此 PAN, idx =', prp.idx)
        me.value = p
    }),
}

nextTick(func.watch)
watch(pans.value, func.watch)
</script>