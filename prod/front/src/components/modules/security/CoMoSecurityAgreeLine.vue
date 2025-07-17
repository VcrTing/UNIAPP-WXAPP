<template>
    <view>
        <view class="btn-def" :class="clazz" @tap="funn.kck">
            <view class="fx-i fx-t px py mxw-pc c-p">
                <view class="px">
                    <view v-if="checked" class="w-1em h-1em">
                        <UiI clazz="pri" i="check"/>
                    </view>
                    <view v-else class="pt-s">
                        <view class="w-1em h-1em btn-pri br-cir">
                        </view>
                    </view>
                </view>
                <view class="">
                    <text class="tit">已同意并阅读</text>
                    <text class="pri" @tap="funn.look(1)">《{{ info.name }}服务协议》</text>
                    <text class="pri" @tap="funn.look(0)">《隐私政策》</text>
                </view>
            </view>
        </view>
        <VwPubSecurityPagPan :idx="pan_xy.idx" :lookv="aii.lookxy"/>
    </view>
</template>

<script setup lang="ts">
import { appState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import { tipwarn } from '@/tool/uni/uni-global';
import UiI from '@/ui/element/i/UiI.vue';
import VwPubSecurityPagPan from '@/view/publish/component/VwPubSecurityPagPan.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    clazz?: string, canedit: boolean
}>()

const checked = computed(() => {
    return aii.agree == 1
})

const aii = reactive({
    agree: prp.canedit ? 0 : 1, lookxy: 0,
})

const funn = {
    cg: (e: ONE) => {
        console.log('vg =', e)
    },
    kck: () => {
        const v: number = aii.agree
        aii.agree = v == 1 ? 0 : 1;
        console.log('v =', aii.agree)
    },
    look: (v: number) => {
        aii.lookxy = v || 0;
        pan_tooi.open_def_r(pan_xy.idx, pan_xy.hui)
    },
    v: () => {
        const v = aii.agree;
        if (v == 0) {
            tipwarn('请您阅读并同意服务协议与隐私政策。')
            return false
        }
        else {

        }
        return true
    }
}

defineExpose(funn)

const info = computed((): AppInfo => appState.info) 

const pan_xy = { idx: 99, hui: <ElePanHui>{ opacity: 0.1 } }
</script>