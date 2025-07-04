<template>
    <ui-dropdown ref="dropdown">
        <template #sign>
            <o-input-s :text_mode="is_nice_v" :pchd="'请选择'">
                {{ v }}
            </o-input-s>
        </template>
        <template #con>
                <view class="o-caniendar">
                    <view class="px-s">
                        <caniendar ref="caniendar_1" :form="form" :pk="pk"/>
                    </view>
                    <view class="">
                        <view class="pt">
                            <o-div @touch="funn.pastday(0)" :clazz="'btn br-s tid'">
                                <view class="mw-5em py-s">現在</view>
                            </o-div>
                            <o-div @touch="funn.reset" :clazz="'btn br-s tid'">
                                <view class="mw-5em py-s ">重置</view>
                            </o-div>
                            <o-div @touch="funn.clear" :clazz="'btn br-s tid'">
                                <view class="mw-5em py-s">置空</view>
                            </o-div>
                        </view>
                    </view>
                    <view class="fx-s pt">
                        <view class="fx-1">
                            <o-div @touch="funn.sure" :clazz="'btn w-100 br-br br-bi bg-btn'">
                                <view class="mw-5em py-n">确定</view>
                            </o-div>
                        </view>
                    </view>
                </view>
        </template>
    </ui-dropdown>
</template>
    
<script lang="ts" setup>
import { promise } from '@/tool/util/future';
import { is_nice_sn } from '@/tool/util/valued';

const emt = defineEmits([ 'result' ])
const prp = defineProps<{ form: ONE, pk: string }>()

const v = computed(() => prp.form[prp.pk])
const is_nice_v = computed(() => is_nice_sn(v.value))

const dropdown = ref()
const caniendar_1 = ref()

const funn = {
    pastday: (n: number) => promise(() => emt('result', caniendar_1.value.change_day(n, new Date())) ),
    reset: () => promise(() => {
        if (is_nice_sn(origin.value)) { emt('result', origin.value); } 
        else { emt('result', '') }
    }),
    clear: () => promise(() => { caniendar_1.value.ciear(); emt('result', '') }),
    //
    close: () => dropdown.value.close(),
    sure: () => funn.close(),
    //
    init: () => promise(() => {
        const v = prp.form[ prp.pk ]
        if (v) {  origin.value = v }
    })
}

const origin = ref<string>()
nextTick(funn.init)
</script>