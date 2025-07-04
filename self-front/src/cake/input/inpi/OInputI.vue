<template>
    <view>
        <view class="o-input o-input-i" :class="err ? 'o-input-err' : ''">


            <view class="inp-outter ps-r">

                <view class="inp-i-i abs-i middie">
                    <o-f-i :i="i" @tap="emt('tapi')"/>
                </view>
            
                <input 
                    class="inp py-s px-inp br tils mh-inp" 
                    :class="clazz_input"
                    :type="typ ? typ : 'text'"

                    :placeholder="pchd ? pchd : '请输入'" 
                    :value="def" 
                    @input="func.inp" />
                
                <view class="in-i-r abs-r middie" v-if="ir">
                    <o-f-i :i="ir" @tap="emt('tapr')"/>
                </view>
            </view>

            <view v-if="err" class="err px-inp pt-s soft">
                {{ err }}
            </view>
        </view> 
    </view>
</template>

<script setup lang="ts">
import { uni_get_input_v } from '@/tool/uni/uni';

const prp = defineProps<{
    def?: any,
    err?: string,

    i?: string,
    ir?: string

    typ?: string,
    pchd?: string,
    clazz_input?: string
}>()

const emt = defineEmits([ 'result', 'clear', 'tapi', 'tapr' ])

const func = {
    inp: (e: any) => {
        const v: SN = uni_get_input_v(e)
        emt('result', v)
    }
}
</script>