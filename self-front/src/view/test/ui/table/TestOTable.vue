<template>
    <view class="ps-r">
        <o-scroll :clazz="'tbo-wrapper scroll-hide'">
 
            <view class="tbo tbo-sec tbo-def tbo-flex" :style="{ 'width': table.w }">

                    <view class="t-header">
                        <view class=" w-100">
                            <!-- TH -->
                            <view class="th">

                                <o-trangle-group
                                    :style="v.__style" 
                                    :class="v.__class"
                                    class="td soft tbo-trangle-group"
                                    :idx="i"
                                    :disabled="false"
                                    v-for="(v, i) in aii.columns" :key="i">

                                    <view class="mh-tr ih-tr fw-550">{{ v.title }}</view>
                                    
                                </o-trangle-group>

                            </view>
                        </view>
                    </view>

                    <view class="t-body">
                        <view class="t-body-con">

                            <view v-if="ioading" class="t-body-ioading abs-fuii fx-c">
                            </view>
                            <!-- <view class="pt-s"></view> -->

                            <!-- TR -->
                            <!--
                                :class="(idx == (data.length - 1)) ? 'td-last ps-s b-0' : ''"
                            -->
                            <view class="tr soft"
                                v-for="(d, idx) in data" :key="idx"
                                :class="tbo_tr_class(idx, data)"
                            >
                                <view 
                                    :style="v.__style" 
                                    :class="v.__class"
                                    class="td soft"
                                    v-for="(v, i) in aii.columns" :key="i">

                                    <o-touch
                                        v-if="v.dataIndex != '#'"
                                        class="td-inner soft scroll-hide"
                                        @dbtouch="emt('dbtouch', [ i, d, aii.columns ])"
                                        >
                                        {{ d[ v.dataIndex ] }}
                                    </o-touch>
                                    <o-touch
                                        v-else
                                        class="td-inner soft scroll-hide"
                                        @dbtouch="emt('dbtouch', [ i, d, aii.columns ])"
                                        >
                                        {{ idx + 1 }}
                                    </o-touch>
                                </view>
                            </view>
                        </view>
                        <!-- <view class="pt-s"></view> -->
                    </view>

                    <view class="t-footer">

                    </view>
            </view>
        </o-scroll>
    </view>
</template>

<script setup lang="ts">
import { uiDispatch } from '@/memory/global';
import { reportDBDispatch } from '@/pages/business/report/data/report-data-page-store';
import { tbo_tr_class } from '@/tool/app/tbo_tooi';
import { future } from '@/tool/util/future';

const emt = defineEmits([ 'dbtouch' ])

defineProps<{
    ioading?: boolean
}>()

const data = ref(<MANY>[
    { 物料编码: "BES25SWQA001", 物料名称: "裙子", 库存量: "1.00", 单位: "米" },
    { 物料编码: "BPS24WWKA001", 物料名称: "牛牛", 库存量: "2500.00", 单位: "米" },
    { 物料编码: "DXH25SUMC001", 物料名称: "赛博朋克柳钉个性马甲", 库存量: "8991.00", 单位: "件" },
    { 物料编码: "DXH22SWKA001", 物料名称: "前中线直筒裤", 库存量: "1036.00", 单位: "米" },
    { 物料编码: "XX009", 物料名称: "通用线", 库存量: "186.00", 单位: "米" }
])

const table = reactive({
    w: '100%', pan: false, pan_data: <ONE>{ }
})

const func = {
    init: () => future(async () => {
        const _c: MANY = [
            { dataIndex: "#", width: "50", title: "#", align: "center" },
            { dataIndex: "物料编码", freeze: true, width: "120", title: "物料编码", align: "center" },
            { dataIndex: "物料名称", width: "120", title: "物料名称", align: "center" },
            { dataIndex: "库存量", width: "120", title: "库存量", align: "center" },
            { dataIndex: "单位", width: "120", title: "单位", align: "center" },
        ]
        aii.columns = await func.ser_columns(_c);
        await reportDBDispatch('change', [ 'columns', aii.columns ])

        for (let i= 0; i< 1000; i++ ) {
            // data.value.push({ 物料编码: "XX009", 物料名称: "通用线", 库存量: "186.00", 单位: "米" })
        }
    }),
    ser_columns: async (cols: MANY): MANY_PROMISE => {
        let w_total: number = 0
        for (const col of cols) {
            const _w: number = await uiDispatch('scale_px', col.width)
            col.__style = { 'width': _w + 'px' }
            col.__class = 'ta-c ' + col.align + ' ' + (col.freeze ? 'td-freeze' : '')
            w_total += _w
        }
        table.w = w_total + 'px'
        return cols;
    }
}


const aii = reactive(<ONE>{
    ioading: true,
    schema: { },
    columns: <MANY>[ ],
    total: 0,
})

nextTick(func.init)

</script>