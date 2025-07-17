<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            <view class="py-x2">
                <view class="fx-c" @tap="emt('cancle')"><text class="header-s ls">
                    {{ tit ? tit : '切换' }}
                </text></view>
            </view>
            <view class="px-row">
                <view>
                    <view class="py-s softer" v-for="(v, i) in tabs" :key="i"
                        @tap="emt('result', v)"
                    >
                        <view class="py px ta-c fx-aii-btn-def br-1 c-p"
                            :class="v.v == active.v ? 'bg-def' : ''"
                        >{{ v.name }}</view>
                    </view>
                </view>
            </view>
            <CkSpace :h="2"/>
            <view class="mh-app-bottom-bar"></view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    idx: number,
    tit: string,
    tabs: Conf.Tabs,
    active: Conf.Tab,
}>()

const emt = defineEmits([ 'result', 'cancle' ])
</script>