<template>
    <picker-view :indicator-style="pik.indicatorStyle" 
    :value="pik.value" @change="funn.picker_time" 
    class="o-picker-view w-100 h-30vh"
    >
        <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}&nbsp;年</view>
        </picker-view-column>
        <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index">{{item}}&nbsp;月</view>
        </picker-view-column>
        <picker-view-column>
            <view class="item" v-for="(item,index) in days" :key="index">{{item}}&nbsp;日</view>
        </picker-view-column>
    </picker-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const prp = defineProps<{
    def: string | null
}>()

const date = new Date()
const years = <number[]>[ ]
const months = <number[]>[ ]
const days = <number[]>[ ]

const def_year = date.getFullYear()

for (let i = 1990; i <= def_year; i++) {
    years.push(i)
}
for (let i = 1; i <= 12; i++) {
    months.push(i)
}
for (let i = 1; i <= 31; i++) {
    days.push(i)
}

//
const pik = reactive({
    indicatorStyle: `height: 3.6em;`,
    year: def_year, month: date.getMonth() + 1, day: date.getDate(),
    value: [ 2025, date.getMonth(), date.getDate() - 1 ],
})

const emt = defineEmits([ 'result' ])

const funn = {
    v: () => (pik.year + '-' + pik.month + '-' + pik.day),
    result: (v: string) => {
        emt('result', v)
    },
    picker_time: (e: ONE) => {
        const val = e.detail.value
        pik.year = years[val[0]]
        pik.month = months[val[1]]
        pik.day = days[val[2]]
        //
        funn.result(funn.v())
    },
    init: () => {

    }
}

defineExpose(funn)
</script>

<style lang="sass" scoped>
.o-picker-view
    text-align: center
    line-height: 3.6em
</style>