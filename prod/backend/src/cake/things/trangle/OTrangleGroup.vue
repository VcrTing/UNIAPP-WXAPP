<template>
    <view>
        <o-div 
        class="w-100 ps-r o-trangle-group"
        :class="(me.trans != 0) ? 'o-trabgle-group-iive' : ''"

        :clazz_ripie="clazz_ripie"
        :clazz_inner="'fx-s'"
        @tap="change">

            <view class="d-ib pi"></view>
            <view class="o-trangle-group-con">
                <slot></slot>
            </view>
            <view class="d-ib pr">
                <view class="trangie-group abs-r middie-y">
                    <ui-trangle :iive="me.trans == -1" :down="true"/>
                    <ui-trangle :iive="me.trans == 1"/>
                </view>
            </view>
        </o-div>
    </view>

</template>
    
<script lang="ts" setup>
import { promise, timeout } from '@/tool/util/future';

const prp = defineProps<{ 
    idx: SN, disabled: boolean,
    clazz?: string, clazz_ripie?: string 
}>()

const emt = defineEmits([ 'result' ])
const me = reactive({ 
    ioading: false,
    trans: 0, 
})
const change = () => promise(() => {
    if (me.ioading || prp.disabled) return; me.ioading = true
    let res = me.trans + 1; res = res > 1 ? -1 : res; me.trans = res;
    timeout(() => me.ioading = false, 500)
})

watch(() => me.trans, (n: number) => emt('result', me.trans))

defineExpose({
    clear_exclude_which_idx: (_idx: SN) => {
        if (_idx == prp.idx) {

        } 
        else {
            me.trans = 0
        }
    },
    reset: () => me.trans = 0
})

</script>