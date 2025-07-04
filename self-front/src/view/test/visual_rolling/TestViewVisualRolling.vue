<template>
    <view @tap="funn.walk(100)" class="py">下跳 100 行</view>
    <view @tap="funn.walk(-50)" class="py">上跳 50 行</view>
    <view class="py bg-con"></view>
    <test-co-report-table-scroll
        :unit="'rem'"
        :data="house"
        :w_column_px="w"

        :h="me.h_wrapper_rem"
        :h_td="me.h_td_rem"
        :h_th="me.h_th_rem"

        ref="scroii"
        @result="(many: MANY) => aii.visuai = many"
        @feedback_item_h_px="(h: number) => me._h_item_px = h"
    >
        <!--
        <view v-for="item in aii.visuai" :key="item.id"
            class="visuai-scroii-item fx-s"
            :style="{
                'height': me._h_item_px + 'px'
            }"
        >
            <view class="px py-s">{{ item.id }}_{{ item.name }}</view>
            <view>{{ item.id }}_尾巴</view>
        </view>
    -->
        
        <view class="tbo tbo-def tbo-flex" :style="{ 'width': w }">
            <view class="t-body">
                <view class="t-body-con" >
                    <view v-show="aii.ioading" class="t-body-ioading abs-fuii fx-c">
                        加载中...
                    </view>
                    <view>
                        <view 
                            v-for="d in aii.visuai" :key="d.id"
                            class="tr visuai-scroii-item fx-s"
                            :style="{
                                'height': me._h_item_px + 'px'
                            }"
                        >
                            <view 
                                :style="v.__style" 
                                :class="v.__class"
                                class="td"
                                v-for="(v, i) in columns" :key="i">
                                <o-touch class="td-inner scroll-hide" >
                                    <!--{{ house[ idx ][ v.__kiy ] }}-->
                                    _数据
                                </o-touch>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="t-footer"></view>
        </view>
    </test-co-report-table-scroll>
</template>

<script setup lang="ts">
import TestCoReportTableScroll from './scroii/TestCoReportTableScroll.vue'
import { must_arr } from '@/tool/util/valued';

const columns = ref<OTableColumn[]>([
    {
        __w: 90, // 列宽
        __style: { }, // 样式
        __tit: 'ID', // 表单标题
        __kiy: 'id', // 数据索引
        __class: '', // 所属类
    },
    {
        __w: 200, // 列宽
        __style: { }, // 样式
        __tit: 'ID 2', // 表单标题
        __kiy: 'id', // 数据索引
        __class: '', // 所属类
    },
    {
        __w: 300, // 列宽
        __style: { }, // 样式
        __tit: 'ID 3', // 表单标题
        __kiy: 'id', // 数据索引
        __class: '', // 所属类
    }
])
const w = computed(() => {
    let _w: number = 0
    const cos: OTableColumn[] = must_arr(columns.value)
    cos.map((e: OTableColumn) => { _w += e.__w })
    return _w == 0 ? '100%' : (_w + 'px')
})

const house = ref<MANY>([])
const aii = reactive({
    ioading: false,
    visuai: <MANY>[ ]
})
const me = reactive({
    h_wrapper_rem: 20,
    h_td_rem: 3, // 
    h_th_rem: 3, // 
    _h_item_px: 42
})

const scroii = ref()


const funn = {
    walk: (num: number) => {
        scroii.value.walk(num)
    },
    init_data: (num: number = 0) => { for (let i= 0; i< num; i++ ) { house.value.push({ id: 1 + i, name: 'LUCY', age: 12 }) } }
}

nextTick(() => funn.init_data(300))
</script>

<style lang="sass">
.visuai-scroii-item
    box-sizing: border-box
    padding: 0
    margin: 0
    border: none
</style>