<template>
    <view>
        <view class="o-input o-input-i" :class="err ? 'o-input-err' : ''">
            <view class="inp-outter ps-r">

                <view v-if="i" class="inp-i-i abs-i middie">
                    <OFI clazz="px-row" :i="i" @tap="emt('tapi')"/>
                </view>
            
                <input 
                    class="inp py-s px-inp br tils mh-inp" 
                    :class="clazz_input"
                    :type="typ ? typ : 'text'"

                    :placeholder="pchd ? pchd : '请输入'" 
                    :value="def"
                    @input="func.inp" />
                
                <view class="in-i-r abs-r middie" @tap="emt('tapr')">
                    <OButton>搜索</OButton>
                    <!--
                    <OFI clazz="px-row h5" :i="ir" @tap="emt('tapr')"/>-->
                </view>
            </view>
        </view> 
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import { uni_get_input_v } from '@/tool/uni/uni';

const prp = defineProps<{
    def?: any,
    err?: string,

    i?: ICONS,
    ir?: ICONS

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