<template>
    
    <view class="o-h br-s report-table">
        <view class="ps-r">
            <co-report-table
                :clazz_tbody="'report-table-tbody'" 
                :ioading="aii.ioading" 
                :columns="columns" 

                :dynamic="dynamic"
                :data="data"

                @sort="funn.sort"
                @dbtouch="funn.view_detail"
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import { reportDWDispatch } from '@/pages/report/_memory/report-page-working-store';
import server_report_data from '@/server/report/server_report_data';
import pan_tooi from '@/tool/app/pan_tooi';
import dynamic_pager_util from '@/tool/business/common/dynamic_pager_util';
import report_data_net_util from '@/tool/business/report/report_data_net_util';
import report_schemas_util from '@/tool/business/report/report_schemas_util';
import { future, promise } from '@/tool/util/future';
import { is_nice_one, must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    schema: ReportSchema,
    aii: ONE,
    dynamic: DynamicPager,
    data: MANY,
    columns: OTableColumn[]
}>()

const emt = defineEmits([ 'refresh', 'scrolltolower' ])

const funn = {
    // 排序
    sort: (vv: string[]) => {
        prp.schema.__tbo_sort_key = vv[0]
        prp.schema.__tbo_sort_value = vv[1]
        emt('refresh')
    },
    // 查询详情
    view_detail: (params: ANYS) => future(async () => {
        // console.log("view table detail param =", params)
        await reportDWDispatch('change', [ 'index', params[0] ])
        await reportDWDispatch('change', [ 'item_key', params[2] ])
        await reportDWDispatch('change', [ 'item_key_value', params[3] ])
        await reportDWDispatch('change', [ 'columns', params[4] ])
        pan_tooi.open_def_r(0, undefined)
    }),
}

const expose = {
    // 首先查询 表格的 信息
    __msg: async () => {
        const res: ReportDataTableMsgOrigin = await server_report_data.msg( 
            report_data_net_util.get_query_param(prp.schema, prp.dynamic) 
        ) as ReportDataTableMsgOrigin;
        // 仅仅刷新 table 信息
        report_schemas_util.change_table_msg(prp.schema, res.columns, res.total);
        prp.dynamic.total = res.total
    },
    // 下拉刷新数据
    __cache: async () => await server_report_data.cache( report_data_net_util.get_query_param(prp.schema, prp.dynamic)  ),
    // 初次获取数据
    __first: async () => {
        console.log('查询之前的 schema =', prp.schema)
        const res: ONE = await server_report_data.first( report_data_net_util.get_query_param(prp.schema, prp.dynamic) )
        if (is_nice_one(res)) {
            // 先做刷新 table 信息
            report_schemas_util.change_table_msg(prp.schema, must_arr( res.columns ), res.total);
            // 返回查询结果
            return must_arr( res.records )
        }
        return [ ]
    },
}

defineExpose(expose)
</script>