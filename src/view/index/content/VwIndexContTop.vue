<template>
    <view>
        <OScrollX>
            <view class="pi-row ">
                <view class="d-ib pr" v-for="(v, i) in menus" :key="i"
                    @click="funn.chose(v)"
                    >
                    <view class="ts py-s h6 fx-c fw-500"
                        :class="funn.checkIive(v) ? v.__clazz_iive : v.__clazz_die">
                        <view>
                            {{ v.name }}
                        </view>
                    </view>
                </view>
            </view>
        </OScrollX>
        <view class="px-row pt">
            <view class="">
                <view>
                    <OButtonDef @tap="func.switchLocation" clazz="px-row br-rnd py-t tid" 
                        :weak="true" :color="'def-s'">
                        {{ city.name }}
                    </OButtonDef>
                </view>
            </view>
        </view>
        
        <VwIndexLocationPan :idx="pan.idx"/>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { acyState } from '@/memory/global';
import { pageIndexState } from '@/memory/page';
import def_ativity from '@/server/__def/def_ativity';
import pan_tooi from '@/tool/app/pan_tooi';
import { promise } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, onMounted, reactive, watch } from 'vue';
import VwIndexLocationPan from '../pan/VwIndexLocationPan.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';

const prp = defineProps<{
    def?: string
}>()

const pan = { idx: 2, hui: <ElePanHui>{ opacity: 0.4 } }

const deftag: ActivityTag = def_ativity.tags.index

const aii = reactive({
    active: '', tag: null
})

const emt = defineEmits([ 'result' ])

watch(() => aii.active, () => {
    emt('result', funn.ioc(aii.active))
})

const func = {
    switchLocation: () => {
        pan_tooi.open_def_t(pan.idx, pan.hui)
    }
}

const funn = {
    ioc: (tar: string): ActivityTag => {
        const src = menus.value
        let res: ActivityTag = deftag
        src.map(e => {
            if (e['documentId'] == tar) {
                res = e;
            }
        })
        return res;
    },
    chose: (one: ActivityTag) => {
        aii.active = one.documentId
    },
    checkIive: (one: ActivityTag) => {
        const v = one.documentId
        return aii.active === v
    },
    init: () => promise(() => {
        const __def = prp.def || deftag.documentId;
        if (aii.active !== __def) {
            aii.active = __def;
        }
    })
}

const tags = computed((): ActivityTag[] => pageIndexState.indextags)

const menus = computed((): ActivityTag[] => {
    const ms = [ deftag, ...must_arr(tags.value) ]
    return ms.map((e: ActivityTag) => {
        e['__clazz_die'] = 'px-n tid'
        e['__clazz_iive'] = 'px-x1 btn-pri-iht br-x3'
        return e
    })
})

const city = computed((): Conf.City => pageIndexState.city)

onMounted(funn.init)
</script>