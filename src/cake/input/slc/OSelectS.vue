<template>
    <view class="ui-dropdown" :class="_class">
        <view class="ui-dropdown-sign" @tap="mefunn.open">
            <o-input-s 
                :clazz="iive ? 'o-inp-sec-iive' : ''"
                :text_mode="iive"
                :pchd="'请选择'">
                {{ me.tit }}
            </o-input-s>
        </view>
        <view class="ui-dropdown-con">
            <view class="ui-dropdown-con-inner">
                
                <view v-if="is_nice_arr(me.every)" class="py-t">
                    <view 
                        @tap="func.choice(v, i)"
                        v-for="(v, i) in me.every" :key="i"
                    >
                        <o-div 
                            :clazz_ripie="'bg-pri-iht-fcs'"
                            :clazz="func._item_clazz(v.value)"
                        >
                            <view class="pi-x2 pr py tils">
                                {{ v.label }}
                            </view>
                        </o-div>
                        <!--<view class="o-slc-con-line" v-if="i < len_1"></view>-->
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import slc_tooi from '@/tool/app/slc_tooi';
import { is_nice_arr, is_nice_sn, must_arr } from '../../../tool/util/valued';
import { promise } from '@/tool/util/future';

const prp = defineProps<{
    items: MANY,
    pk_tit: string,
    pk_value: string,

    def?: O_SELECT_CHOISE,
    def_choise?: boolean,
    err?: string,
    pchd?: string,
    label?: string,
    clazz?: string,
    clazz_inner?: string
}>()

const emt = defineEmits([ 'result' ])
const choice = ref<O_SELECT_CHOISE>(undefined)
const iive = computed(() => is_nice_sn(choice.value))

const me = reactive(<OSelectReactive> { tit: '', iive: false, dance_class: '', every: [ ] })

const func = {
    _item_clazz: (v: O_SELECT_CHOISE) => {
        if (is_nice_sn(v)) { return ((choice.value == v) ? 'pri bg-pri-iht' : '') }
        return (choice.value == v) ? 'bg-item ' : ' '
    },
    tit: () => promise(() => { me.tit = is_nice_sn(choice.value) ? slc_tooi.ioc_label(me.every, choice.value) : '' }),
    choice: (item: ONE, i: number) => promise(() => {
        choice.value = item.value; emt('result', choice.value); mefunn.close()
    }),
    init: () => promise(() => {
        // 先放默认值
        const df = prp.def
        if (is_nice_sn(df)) { 
            choice.value = df 
        }
        // 组装选择
        if (is_nice_arr(prp.items)) {
            me.every = slc_tooi.init_select_items(prp.items, prp.pk_tit, prp.pk_value)
        }
        // 给个默认选择
        if (prp.def_choise) {
            if (is_nice_arr(me.every)) {
                if (choice.value == undefined) {
                    choice.value = slc_tooi.def_v(me.every)
                }
            }
            else {
                me.every = slc_tooi.EMPTY
            }
        }
    })
}

nextTick(func.init)
watch(choice, func.tit)

const _class = ref<string>(' ')
const mefunn = {
    close: () => {
        console.log("---- 外部调用的了关闭"); _class.value = ' ui-dropdown-die '
    },
    open: () => {
        console.log('---- 调用了打开'); _class.value = ' ui-dropdown-iive '
    }
}
</script>