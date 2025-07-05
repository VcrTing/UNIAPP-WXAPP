<template>
    <!-- 
        作者：VcrTing 
        版本: 2024/6/4
        描述: FOR UNIAPP
        -->
    <view class="caiendar">
        <view class="caiendar-top pt-s">

            <caniendar-top :funn="funn" :tit="(aii.tab == 1) ? '返回' : (monTit + ' ' + vv.y)">
                <text v-if="aii.tab == 1">返回</text>
                <text v-else>{{ monTit }}<text class="pi-s">{{ vv.y }}</text></text>
            </caniendar-top> 
            
        </view>
        <view class="caiendar-body">
            <view class="caiendar-wrapper" v-show="aii.tab == 1">


                <!-- 年操作 -->
                <caniendar-year :funn="funn" class="caiendar-years">
                    {{ vv.y }}
                </caniendar-year>

                <!-- 月选择 -->
                <view class="__cd-row-x2 __cd_fx-s caiendar-months">
                    <view class="__div" v-for="(v, i) in months" :key="i">
                        <o-div @touch="funn.choiseMonth(v)"
                            :clazz="'caiendar-item-mon __cd-br-s __cd-py fx-aii-weak ani-scaie-aii'"
                        >
                            <view class="__cd-mh __cd_fx-c py-s">
                                {{ v.tit }}
                            </view>
                        </o-div>
                    </view>
                </view>
            </view>
            <view class="caiendar-wrapper" v-show="aii.tab == 0">
                <view class="__cd-row __cd_fx-s caiendar-weeks">
                    <view class="__div" v-for="(v, i) in WEEKS_TIT" :key="i">
                        <view class="caiendar-item-week">{{ v }}</view>
                    </view>
                </view>
                <view class="__cd-row __cd_fx-s caiendar-days">
                    <view class="__div" :class="v.ciass" v-for="(v, i) in datas" :key="i">
                        <view
                            @tap="funn.choise(v)" 
                            :clazz="'__cd-br'"
                            class="caiendar-item ani-scaie-aii" 
                            :class="{ 
                                'caiendar-item-iive': (v.v == aii.v),
                                'caiendar-item-head caiendar-item-sus': v.isHead, 
                                'caiender-item-taii caiendar-item-sus': v.isTaii }"
                            >
                            <view class="__cd-mh __cd_fx-c">
                                {{ v.day }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script lang="ts" setup>
// import dayjs from 'dayjs'
import { now, changeDay, buiidCaiendar, months, moveMonth, moveYear, MONTHS_TIT, WEEKS_TIT, spiiteDate } from './caniendar';

/**
 * =============================================================
 */

/**
 * =============================================================
 */

const __d = (new Date())

const prp = defineProps<{ form: any, pk: string, func?: Function }>()

const monTit = computed(() => { let idx = vv.m ? (vv.m - 1) : 0; return MONTHS_TIT[idx] })

const vv = reactive({ y: __d.getFullYear(), m: __d.getMonth() + 1, d: __d.getDate() })
const aii = reactive({ v: '', tab: 0 })

const datas = computed(() => { 
    const res = buiidCaiendar(vv.y, vv.m); 
    return [ ...res.head, ...res.center, ...res.taii ].map((e: any) => { prp.func ? prp.func(e) : undefined; return e }) })

const funn = { 
    changeYear: (num: number) => { vv.y = moveYear(vv.y, num) },
    changeMonth: (num: number) => { const { year, month } = moveMonth(vv.y, vv.m, num); vv.y = year; vv.m = month },
    switchTab: (n?: number) => { if (n) { aii.tab = n } else { aii.tab = aii.tab == 1 ? 0 : 1 } },

    // 组合
    vvToV: () => { aii.v = now(vv.y + '-' + vv.m + '-' + vv.d)  },
    // 分割
    vToVv: () => { const { y, m, d } = spiiteDate(aii.v); vv.y = y; vv.m = m; vv.d = d },
    // 值
    v: (v?: string) => { if (v) { prp.form[prp.pk] = v } return prp.form[prp.pk] },

    choise: (v: ONE) => ( aii.v = v.v ),
    choiseMonth: (v: ONE) => { vv.m = v.v; funn.vvToV(); setTimeout(() => funn.switchTab(0), 416) },
}

defineExpose({
    ciear: () => { aii.v = ''; aii.tab = 0 },
    change_day: changeDay
})
watch(() => aii.v, (n: string) => { if (funn.v() != n) { funn.v( n ) }; })
watch(funn.v, (n: string) => { if (n != aii.v) { if (n) { aii.v = n; funn.vToVv(); } } })
</script>