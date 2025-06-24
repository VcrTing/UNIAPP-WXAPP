<template>
    <view>
        <OScrollX>
            <view class="pi-row py-s">
                <view class="d-ib pr softer" v-for="(v, i) in menus" :key="i"
                    @click="funn.chose(v)"
                    >
                    <view class="ts py-s h6 fx-c fw-500 br-rnd c-p ani-scaie-aii"
                        :class="funn.checkIive(v) ? v.__clazz_iive : v.__clazz_die">
                        <view>
                            {{ v.name }}
                        </view>
                    </view>
                </view>
            </view>
        </OScrollX>
        <view class="fx-s fx-b">
            <view class="">
                <view class="pb pt-s px-row" @tap="func.switchLocation">
                    <OButton clazz="px-row br-rnd py-t tid softer" 
                        :weak="true" color="def-s">
                        {{ city.name }}
                    </OButton>
                </view>
            </view>
            <view>
                <view class="pb pt-s px-row softer" @tap="func.openTags">
                    <view class="btn-def-s px-col br-t fx-aii-btn-def"><UiI clazz="tiw" i="b"/> </view>
                </view>
            </view>
        </view>
        <!-- -->
        <VwIndexTagsPan :idx="pan_tag.idx" :active="aii.active" @result="funn.choseFromPan"/>
        <VwIndexLocationPan :idx="pan_ioc.idx"/>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { pageIndexDispatch, pageIndexState } from '@/memory/page';
import def_ativity from '@/server/__def/def_ativity';
import pan_tooi from '@/tool/app/pan_tooi';
import { futuring, promise } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, onMounted, reactive, watch } from 'vue';
import VwIndexLocationPan from '../pan/VwIndexLocationPan.vue';
import UiI from '@/ui/element/i/UiI.vue';
import VwIndexTagsPan from '../pan/VwIndexTagsPan.vue';
import { arrfindi } from '@/tool/util/iodash';
import OButton from '@/cake/button/OButton.vue';

const pan_ioc = { idx: 2, hui: <ElePanHui>{ opacity: 0.4 } }
const pan_tag = { idx: 4, hui: <ElePanHui>{ opacity: 0.4 } }

const deftag: Tag = def_ativity.tags.index

const aii = reactive({
    choses: <Tag[]> [ ],
    active: <Tag> { }, tag: null, ioading: false
})

const emt = defineEmits([ 'result' ])

watch(() => aii.active, () => {
    emt('result', aii.active)
})

const func = {
    switchLocation: () => {
        pan_tooi.open_def_t(pan_ioc.idx, pan_ioc.hui)
    },
    openTags: () => futuring(aii, async () => {
        pan_tooi.open_def_b(pan_tag.idx, pan_tag.hui)
    })
}

const funn = {
    ioc: (tar: string): Tag => {
        const src = menus.value
        let res: Tag = deftag
        src.map(e => {
            if (e['documentId'] == tar) {
                res = e;
            }
        })
        return res;
    },
    choseFromPan: (one: Tag) => {
        aii.active = one;
        const i: number = arrfindi(menus.value, one.documentId, 'documentId')
        if (i < 0) {
            console.log('加入新的标签 =', one)
            aii.choses.push(one)
        }
    },
    chose: (one: Tag) => {
        aii.active = one; // .documentId
    },
    checkIive: (one: Tag) => {
        const v = one.documentId
        return aii.active.documentId === v
    },
    init: () => promise(() => {
        const __def: Tag = deftag;
        if (aii.active !== __def) {
            aii.active = __def;
        }
        // 检查 tag
        pageIndexDispatch('freshtags')
    })
}

const indextags = computed((): Tag[] => pageIndexState.indextags)

const menus = computed((): Tag[] => {
    const ms = [ deftag, ...aii.choses, ...must_arr(indextags.value) ]
    return ms.map((e: Tag) => {
        e['__clazz_die'] = 'px-n tid fx-aii-btn-wht'
        e['__clazz_iive'] = 'px-x1 btn-pri-iht'
        return e
    })
})

const city = computed((): Conf.City => pageIndexState.city)

onMounted(funn.init)
</script>