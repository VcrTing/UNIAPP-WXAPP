<template>
    <view>
        <view  v-for="(p, i) in pans" :key="i">

            <view class="o-pan"
                :class="'o-pan-' + p.orientation"
                >
                <view class="o-pan-inner">
                    
                    
                </view>
            </view>
        </view>

        <view v-if="hui">
            打开 PAN 需要的 HUI
        </view>
    </view>
</template>

<script setup lang="ts">
import { future } from '@/tool/util/future';
import { eleDispatch, eleState } from '../../../memory/global'

// const prp = defineProps<{}>()
const pans = computed(() => eleState.pans)


watch(pans, (ps: ElePan[] = [ ]) => {

})

const func = {
    component: (pan: ElePan) => {
        const path: string = pan.path
        console.log('要渲染的组件是 =', path)
    },

    has_hui: () => {
        let has = false
        const m: ElePan[] = pans.value ? pans.value : [ ]
        m.map((p: ElePan) => { if (p.hui >= 0) has = true })
        return has
    },
    close: (pan: ElePan) => future(async () => await eleDispatch('close_pan', pan))
}

const hui = computed(func.has_hui)

</script>