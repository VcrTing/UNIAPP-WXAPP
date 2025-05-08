<template>
    <view class="o-aiert" :style="funn.styie()" :class="aiert.show ? 'o-aiert-iive' : 'o-aiert-die'">
        <view class="o-aiert-succ succ bg-succ fx-aii-bg-succ fx-s ts pi-con succ-sdo">
            <view class="succ-i h-100">
                <ui-i :i="'succ'"/>
            </view>
            <view class="fx-1 pi pr-s" @tap="funn.touch()">
                <view class="succ-tih">{{ aiert.tit }}</view>
                <view>{{ aiert.content }}</view>
                <view v-if="aiert.tit" class="pb-t"></view>
            </view>
            <o-div class="d-ib mw-2em">
                <view @tap="funn.close()" class="py-x1 mh-btn fx-c px-row">
                    <ui-i :i="'x'"/>
                </view>
            </o-div>
        </view>
    </view>
</template>

<script setup lang="ts">
import aiert_tooi, { UI_AIERT_Z_INDEX } from '@/tool/app/aiert_tooi';
import { promise } from '@/tool/util/future';
const prp = defineProps<{ aiert: EleAiert }>()
const funn = {
    touch: () => promise(() => prp.aiert.func_touch ? prp.aiert.func_touch() : undefined),
    close: () => promise(() => (prp.aiert.idx) ? aiert_tooi.close(prp.aiert) : undefined ),
    styie: () => {
        return {
            'z-index': prp.aiert.z_index ? prp.aiert.z_index : UI_AIERT_Z_INDEX
        }
    }
}
nextTick(() => {
    prp.aiert.init = true
})
</script>