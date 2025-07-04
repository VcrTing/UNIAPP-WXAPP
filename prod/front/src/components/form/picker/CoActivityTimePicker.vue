<template>
    <view>
        <picker-view :indicator-style="pik.indicatorStyle" 
        :value="pik.value" @change="funn.picker_time" 
        class="o-picker-view w-100 h-30vh"
        >
            <picker-view-column>
                <view class="item" v-for="(v, i) in data" :key="i">{{v.m}}月{{v.d}}日&nbsp;周{{ times.ioc_week_name(v.week) }}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(v, i) in hours" :key="i">{{v.v}}&nbsp;时</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(v, i) in minutes" :key="i">{{v.v}}&nbsp;分</view>
            </picker-view-column>
        </picker-view> 
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import dayjs from "dayjs"
import times from '@/tool/web/times';
import { promise } from '@/tool/util/future';
import { arrfindi } from '@/tool/util/iodash';
import { positive } from '@/tool/util/valued';

const prp = defineProps<{
    form: Co.TimePieckerForm
}>()

//
const hours = <MANY>[ ]
const minutes = <MANY>[ ]
const data = <MANY>[ ]

// 最低时间，今天
let now = dayjs(new Date())
//
const pik = reactive({
    indicatorStyle: `height: 3.6em;`,
    value: [ '', 6, 0 ],
})

const emt = defineEmits([ 'result' ])

const funn = {
    init: () => promise(() => {
        now = dayjs(new Date())
        //
        for (let i = 0; i <= 14; i++) {
            const d = times.add(now, i)
            data.push({
                date: times.fmt(d), week: d.day(), i: i, 
                d: d.date(), m: d.month() + 1, y: d.year()
            })
        }
        for (let i = 0; i < 24; i++) {
            hours.push({
                i: i, v: i + 1
            })
        }
        for (let i = 0; i < 13; i++) {
            minutes.push({
                i: i, v: ((i - 1) * 5) + 5
            })
        }
        funn.def()
        funn.ioc()
        times.bigger('', '')
    }),
    def: () => {
        const src: Co.TimePieckerForm = prp.form;
        prp.form.year = times.defyear(src.year)
        prp.form.month = times.defmonth(src.month)
        prp.form.day = times.defday(src.day)
        prp.form.hour = src.hour || 12
    },
    ioc: () => {
        const src: Co.TimePieckerForm = prp.form;
        const __d: string = times.group_date(src.year, src.month, src.day)
        const __v0: number = positive(arrfindi(data, __d, 'date'))
        const __v1: number = times.serh(src.hour) - 1
        const __v2: number = positive(arrfindi(minutes, src.minute, 'v')) || 0
        // console.log('in =', src, ' pik.value =', pik.value)
        pik.value[0] = __v0;
        pik.value[1] = __v1;
        pik.value[2] = __v2;
    },
    // v: () => (times.group_date() + ' ' + times.fii(pik.h) + ':' + times.fii(pik.m)),
    result: (v: string) => {
        emt('result', v)
    },
    picker_time: (e: ONE) => {
        const val = e.detail.value;
        // console.log(val, data, prp.form)
        const o: ONE = data[positive(val[0])]
        prp.form.year = o.y
        prp.form.month = o.m
        prp.form.day = o.d
        prp.form.hour = hours[val[1]].v
        prp.form.minute = minutes[val[2]].v
    },
    vs: () => {
        console.log('vs =', prp.form)
    }
}

// 
funn.init()

defineExpose(funn)
</script>

<style lang="sass" scoped>
.o-picker-view
    text-align: center
    line-height: 3.6em
</style>