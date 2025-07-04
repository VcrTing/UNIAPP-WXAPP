<template>
    <view>
        <view class="o-input" :class="(err ? 'o-input-err ' : ' ') + clazz">
            <view v-if="label" class="sec-tid pb-s px soft">{{ label }}</view>

            <view class="inp-outter">
                <input 
                    v-if="!text_mode"
                    class="inp inp-s inp-pure py-t pi pr-s br-s tils-s mh-inp-s" 
                    :class="clazz_inner"

                    :placeholder="pchd ? pchd : '请输入'" 
                    :value="def" 
                    @input="func.inp" />
                <view 
                    v-else
                    class="inp inp-s py-t pi pr-s br-s tils-s mh-inp-s fx-i" >
                    <slot></slot>
                </view>
                <!-- <text class="uni-icon" v-if="showClearIcon" @click="clearIcon">&#xe434;</text> -->
            </view>
        </view> 
    </view>
</template>

<script setup lang="ts">
import { uni_get_input_v } from '@/tool/uni/uni';

const prp = defineProps<{
    def?: any,
    err?: string,
    pchd?: string,
    label?: string,

    text_mode?: boolean,

    clazz?: string,
    clazz_inner?: string
}>()

const emt = defineEmits([ 'result' ])

const func = {
    inp: (e: any) => {
        const v: SN = uni_get_input_v(e)
        emt('result', v)
    }
}
</script>