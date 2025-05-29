<template>
    <view class="ps-r zi-n">
        <view class="bg-con py-row">
            <OScrollX>
                <view class="pi-row ">
                    <view class="d-ib pr" v-for="(v, i) in menus" :key="i"
                        @click="funn.chose(v)"
                        >
                        <view class="ts py-s h6 fx-c fw-500"
                            :class="funn.checkIive(v) ? v.clazz_iive : v.clazz_die">
                            <view>
                                {{ v.txt }}
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollX>
            <view class="px-row pt-row">
                <view class="">
                    <view>
                        <OButtonDef @tap="funn.switchLocation" clazz="px-x2 br-rnd py-t tid" :weak="true" :color="'def-s'">深圳市</OButtonDef>
                    </view>
                </view>
            </view>
        </view>
        <view class="pt-s">
            <OScrollY :styie="{
                'height': 'calc( 100vh - 15em )'
            }">
                <view class="px-row pt-row">
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
import VwIndexContList from './list/VwIndexContList.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import VwIndexLocationPan from './pan/VwIndexLocationPan.vue';
import pan_tooi from '@/tool/app/pan_tooi';

// const prp = defineProps<{}>()

const aii = reactive({
    active: '', pan_location_idx: 2, pan_hui: <ElePanHui>{ opacity: 0.4 },
    menu: [
        { txt: '推荐', v: '' },
        { txt: '丝袜诱惑', v: '丝袜诱惑' },
        { txt: '私人陪玩', v: '私人陪玩' },
        { txt: '日常约会', v: '日常约会' },
        { txt: '台球派对', v: '台球派对' },
        { txt: '爬山运动', v: '爬山运动' },
    ]
})

const funn = {
    chose: (one: ONE) => {
        aii.active = one.v
    },
    checkIive: (one: ONE) => {
        const v = one.v
        return aii.active === v
    },
    switchLocation: () => {
        pan_tooi.open_def_t(aii.pan_location_idx, aii.pan_hui)
    }
}

const menus = computed(() => {
    const ms = aii.menu
    return ms.map(e => {
        return {
            ...e, 
            clazz_die: 'px-n tid',
            clazz_iive: 'px-x1 btn-pri-iht br-x3',
        }
    })
})
</script>