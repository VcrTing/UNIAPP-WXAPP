<template>
    <view class="ps-r">
        <!-- 查询
        <view class="br o-h">
            <view class="row fx-r">
                <view class="px-row-s" @tap="funn.search()">
                    <o-div 
                        :clazz="'btn d-ib mw-8em br-br br-tr btn-pri'" 
                        :clazz_inner="'fx-c mh-btn'" >
                        查询
                    </o-div>
                </view>
            </view>
        </view> -->

        <!-- 表单 -->
        <view class="o-h br-s report-table">
            <o-table 
                :clazz_tbody="'report-table-tbody'" 
                :ioading="aii.ioading" 
                :columns="rep.columns" :datas="rep.datas"

                @sort="funn.sort"
                @dbtouch="funn.view_detail"
                />
        </view>
        <view class="">
            <view class="mh-btn"></view>
            <view class="mh-btn"></view>
        </view>
        <view class="abs-b zi-s r-0 i-0">
            <!--
            <o-button @touch="funn.search()" :clazz="'w-100'">查询</o-button>
            -->
            <ViewTestReportActionBar :schema="schema" @search="funn.search"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import server_report_data from '@/server/report/server_report_data';
import pan_tooi from '@/tool/app/pan_tooi';
import tbo_tooi from '@/tool/app/tbo_tooi';
import report_data_net_util from '@/tool/business/report/report_data_net_util';
import { future, futuring } from '@/tool/util/future';
import { is_nice_one, must_arr, must_one } from '@/tool/util/valued';
import ViewTestReportActionBar from './bar/ViewTestReportActionBar.vue';

const prp = defineProps<{
    code: string,
    aii: ONE
    schema: ReportSchema,
    schemas: ReportSchema[]
}>()

const rep = reactive({
    columns: <OTableColumn[]> [ ],
    datas: <MANY[]> [ ],
    total: 0
})

const me = reactive({ ioading: false, init: true, cache: false })

const funn = {
    // 查询详情
    view_detail: (params: ANYS) => future(async () => {
        console.log("params =", params)
        await reportDBDispatch('change', [ 'index', params[0] ])
        await reportDBDispatch('change', [ 'item', params[2] ])
        await reportDBDispatch('change', [ 'item_key_iive', params[3] ])
        await reportDBDispatch('change', [ 'columns', params[4] ])
        pan_tooi.open_def_r(0, undefined)
    }),
    // 排序
    sort: (vv: string[]) => {
        prp.schema.__tab_sort_key = vv[0]
        prp.schema.__tab_sort_value = vv[1]
        funn.search()
    },
    // 查询多
    search: () => futuring(prp.aii, async () => {
        console.log('开始搜索 =', prp.aii.ioading)
        await funn.fetch()
    }),
    // 获取数据
    __fetch: () => future(async () => {
        const param: ReportDataPageGetParam = must_one( prp.schema.__net_query_param )
        const res: ONE = await server_report_data.page( param )
        // 请求成功
        if (is_nice_one(res)) {
            const records: MANY = must_arr( res.records )
            const columns: MANY = must_arr( res.columns )
            rep.datas.push( records )
            rep.columns = await tbo_tooi.ser_columns( columns as OTableColumn[] )
            rep.total = res.total
        }
        console.log('获取结果 =', param, res)
    }),

    fetch: () => future(async () => {
        const param: ReportDataPageGetParam = report_data_net_util.buiid_query_param(prp.schema, prp.schemas)
        console.log("fecth param =", param)
        rep.datas = [ ]
        await funn.__fetch()
    }),

    init: () => future(async() => {
        // await funn.fetch()
    })
}
defineExpose(funn)
nextTick(funn.init)

function reportDBDispatch(arg0: string, arg1: any[]) {
    throw new Error('Function not implemented.');
}
</script>