<template>
    <view class="sales-order-top">
        <view class="py-x2"></view>
        <view>
            <o-button v-if="aii.ioading">加载中...</o-button>
            <o-button v-else @tap="func.fetch">查询数据</o-button>
        </view>
        <view>
            <view class="py">销售订单，code = {{ code }}，分页 = page: {{ params.pageNo }}, size: {{ params.pageSize }}</view>
        </view>
    </view>
    <view class="sales-order-center">
        <view class="pb-x2">
            <view class="os-table my" :style="{ 'width': table.w }">
                <view class="os-theader ps-s t-0">
                    
                    <!-- TH -->
                    <view class="os-th py-s">
                        <view 
                            :style="v.__style" 
                            :class="v.__class"
                            class="os-td"
                            v-for="(v, i) in aii.columns" :key="i">
                            <view class="os-td-inner">
                                {{ v.title }}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="os-tbody pt-s">

                    <!-- TR -->
                    <view class="os-tr"
                        v-for="(d, idx) in data" :key="idx"
                        :class="(idx == (data.length - 1)) ? 'os-td-last ps-s b-0' : ''"
                    >
                        <view 
                            :style="v.__style" 
                            :class="v.__class"
                            class="os-td"
                            v-for="(v, i) in aii.columns" :key="i">
                            <ck-touch
                                @dbtouch="doing.openPan(d)"
                                v-if="v.dataIndex != '#'"
                                class="os-td-inner">

                                {{ d[ v.dataIndex ] }}
                            </ck-touch>
                            <ck-touch
                                @dbtouch="doing.openPan(d)"
                                v-else
                                class="os-td-inner">
                                {{ idx + 1 }}
                            </ck-touch>
                        </view>
                    </view>
                </view>
            </view>

        </view>

        <ui-pan-r v-if="table.pan" :z_index="398" :clazz="''">
            <view v-if="table.pan" class="w-100 h-100 px pt-x2 pb o-s-y pan-sales-order">
                <view class="py-x2">
                    <view class="pb"
                        v-for="(v, i) in aii.columns" :key="i">
                        <view>
                            {{ v.title }}
                        </view>
                        <view
                            v-if="v.dataIndex != '#'"
                            class="pi-x2 pt-t">
                            {{ table.pan_data[ v.dataIndex ] ? table.pan_data[ v.dataIndex ] : '(空)' }}
                        </view>
                        <view
                            v-else
                            class="pi-x2 pt-t">
                            1
                        </view>
                    </view>

                    <view class="h-h1"></view>
                </view>
                <view class="abs-b i-0 px pb w-100">
                    <o-button class="w-100" @tap="doing.closePan">关闭</o-button>
                </view>
            </view>
        </ui-pan-r>
    </view>
</template>

<script setup lang="ts">

import { uiDispatch, uiState } from '@/memory/global';
import server_report_data from '@/server/report/server_report_data';
import server_report_schema from '@/server/report/server_report_schema';
import { goLogin } from '@/tool/router/router';
import { future, promise, timeout } from '@/tool/util/future';
import { is_nice_arr, is_nice_one } from '@/tool/util/valued';

// const prp = defineProps<{}>()

const code = ref('1651716406')
const data = ref(<MANY>[ ])
const table = reactive({
    w: '100%', pan: false, pan_data: <ONE>{ }
})

const aii = reactive(<ONE>{
    ioading: true,
    schema: { },
    columns: <MANY>[ ],
    total: 0,
})

const capacity = computed(() => uiState.root_font_size_coefficient)

const params = reactive(<ServerReportListParam>{
    reportId: '',
    tableName: '',
    levelName: '',
    paramMap: {

    },
    fieldsMap: { },
    isDynamicFields: 'false',
    procName: '',
    pageNo: 0,
    pageSize: 200,
    column: '',
    order: 'desc',
    isCache: 'false'
})

const doing = {
    openPan: (item: ONE = { }) => { table.pan = true; table.pan_data = item },
    closePan: () => { table.pan = false; table.pan_data = { }; console.log('关闭 PAN') }
}

const func = {

    ser_columns: async (cols: MANY): MANY_PROMISE => {
        let w_total: number = 0
        for (const col of cols) {
            const _w: number = await uiDispatch('scale_px', col.width)
            col.__style = { 'width': _w + 'px' }
            col.__class = 'o-text-align-' + col.align
            w_total += _w
        }
        table.w = w_total + 'px'
        return cols;
    },

    fetch: async () => future( async () => {
        if (aii.ioading) return
        aii.ioading = true

        params.paramMap = func.pMap
        params.procName = aii.schema.procName
        params.reportId = aii.schema.id
        params.tableName = aii.schema.tableName
        params.fieldsMap = JSON.parse( aii.schema.fieldsMap )
        
        const res: ONE = await server_report_data.page(params)

        if (res) {
            console.log('获取的数据 =', res)
            aii.total = res.total
            aii.columns = await func.ser_columns( res.columns )
            data.value = res.records
            aii.records = res.records
            console.log('优化后的 cols =', aii.columns)
        }
        else {
            // 获取数据失败了
        }
        timeout(() => aii.ioading = false, 100)
    }),

    schema: () => future(async () => {
        const res: MANY = await server_report_schema.one( code.value )
        if (is_nice_arr(res)) {
            aii.schema = res[0]
            if (!is_nice_one(aii.schema)) goLogin()
        }
        aii.ioading = false
    })
    ,
    pMap: {
        BM
        : 
        "",
        BZType
        : 
        "",
        Bdate
        : 
        "",
        CardCode
        : 
        "",
        CardName
        : 
        "",
        Code
        : 
        "",
        Color
        : 
        "",
        ColorC
        : 
        "",
        DDLX
        : 
        "",
        DDType
        : 
        "",
        DocEntry
        : 
        "",
        Edate
        : 
        "",
        ItemCode
        : 
        "",
        JJ
        : 
        "",
        LB
        : 
        "",
        NF
        : 
        "",
        SFQX
        : 
        "",
        SaleMan
        : 
        "",
        Status
        : 
        ""
    }
}

nextTick(func.schema)

</script>

<style lang="sass" scoped>
.os-td-last
    background: #eff2f2

.sales-order-top
    height: 10rem
.sales-order-center
    height: calc( 95vh - 10rem )
    overflow: scroll

.o-text-align-center
    text-align: center
.os-td
    display: inline-block

.os-table-wrapper
    overflow: hidden
    overflow-x: scroll

.os-table
    color: #000000E2
    background: #f6f9f9
    min-height: 200px
    min-width: 61.8vw

.os-theader
    background: #eff2f2
    // border-top: 1px solid #e3e7e7
    .os-th
        .os-td-inner
            min-height: 2em
            line-height: 2em
.os-tbody
    .os-td
        min-height: 1.6em
        line-height: 1.6em

.os-tr, .os-td
    border: none
.os-td
    // background-image: linear-gradient(#e8eaec, #e8eaec), linear-gradient(#e8eaec, #e8eaec)
    .os-td-inner
        white-space: nowrap
        min-height: 1.4em
        overflow: hidden
        overflow-x: scroll


.pan-sales-order
    width: calc( 15vw + 117px )
</style>