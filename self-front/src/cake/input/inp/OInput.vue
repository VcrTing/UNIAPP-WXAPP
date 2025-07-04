<template>
    <view>
        <view class="o-input" :class="err ? 'o-input-err' : ''">

            <view v-if="tit" class="pr-inp pb-s soft">
                <view v-if="err" class="err soft">
                    {{ err }}
                </view>
                <view v-else class="inp-tih soft">
                    {{ tit }}
                </view>
            </view>

            <view class="inp-outter">
                <input 
                    class="inp py-s px-inp br tils mh-inp" 
                    :class="clazz_input"
                    :type="typ ? typ : 'text'"

                    :placeholder="pchd ? pchd : '请输入'" 
                    :value="def" 
                    @input="func.inp" />
                <!-- <text class="uni-icon" v-if="showClearIcon" @click="clearIcon">&#xe434;</text> -->
            </view>

            <view v-if="!tit">
                <view v-if="err" class="err px-inp pt-s soft">
                    {{ err }}
                </view>
            </view>
        </view> 
    </view>
</template>

<script setup lang="ts">
import { uni_get_input_v } from '@/tool/uni/uni';

const prp = defineProps<{
    def?: any,
    err?: string,

    tit?: string,
    typ?: string,
    pchd?: string,
    clazz_input?: string
}>()

const emt = defineEmits([ 'result' ])

const func = {
    inp: (e: any) => {
        const v: SN = uni_get_input_v(e)
        emt('result', v)
    }
}
</script>