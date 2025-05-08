<template>
    <view>
        <view class="fx-s">
            <o-div :clazz_inner="'py px mw-6em'" @touch="funn.filter">过滤器</o-div>
            <o-div :clazz_inner="'py px mw-6em'" @touch="funn.walk(1000)">下跳1000行</o-div>
            <o-div :clazz_inner="'py px mw-6em'" @touch="funn.walk(-500)">上跳500行</o-div>
        </view>
        <view class="fx-s">
            <o-div :clazz_inner="'py px mw-6em'" @touch="funn.search">查询 {{ schema.__tab_name }}</o-div>
            <o-div :clazz_inner="'py px mw-6em'" @touch="funn.search">查询 {{ schema.__tab_name }}</o-div>
        </view>
        <!-- 表单 -->
        <ViewReportDataTable
            @refresh="funn.search"

            :dynamic="dynamic"
            :schema="schema"

            :aii="aii"
            :data="data"
            :columns="schema.__tbo_columns"

            @scrolltolower="funn.pagedown"

            ref="tbo"
        />
    </view>
</template>

<script setup lang="ts">
import ViewReportDataTable from './ViewReportDataTable.vue';

import { future, futuring } from '@/tool/util/future';
import report_cache_util from '@/tool/business/report/report_cache_util';
import pan_tooi from '@/tool/app/pan_tooi';
import { is_nice_arr } from '@/tool/util/valued';
import pager_tooi, { PAGER_DEF_SIZE } from '@/tool/business/common/pager_tooi';
import dynamic_pager_util from '@/tool/business/common/dynamic_pager_util';
import { reportDPDispatch } from '@/pages/report/_memory/report-page-deploy-store';
import { reportDWDispatch } from '@/pages/report/_memory/report-page-working-store';

const prp = defineProps<{
    aii: ONE,
    schema: ReportSchema,
    schemas: ReportSchema[]
}>()

// 数据空间
// const faker = ref<DATA_FAKER>([])
// const house = ref<DATA_HOUSE>({})
const data = ref<MANY>([])

// 动态分页记录
const dynamic = reactive(<DynamicPager>{
    enable: true,
    size: PAGER_DEF_SIZE,
    star: 0,
    walk: 0,
    star_max: 0,
    star_max_limit: PAGER_DEF_SIZE,
    total: PAGER_DEF_SIZE
})

const is_full = computed(() => data.value.length != 0 && data.value.length == dynamic.total)

const tbo = ref()

const funn = {
    walk: (num: number) => future(async () => await reportDWDispatch('walk', num)),

    filter: () => {
        pan_tooi.open_def_t(10, { opacity: 0.35 })
    },
    // 下拉
    pagedown: () => future(async () => {
        
    }),
    // 新获取数据
    fetch: () => future(async () => {
        if (is_full.value) {
            console.log('无需再次加载数据')
        }
        else {
            data.value.length = 0
            dynamic.size = prp.schema.__tbo_total
            const res: MANY = await tbo.value.__first()
            // 每次重新请求，就要重置 dynamic
            dynamic_pager_util.reset_dynamic(dynamic, prp.schema.__tbo_total, dynamic.size)
            data.value.length = res.length
            data.value = res
        }
        console.log('数据长度 =', data.value.length)
    }),

    // 查询
    search: () => futuring(prp.aii, async () => await funn.fetch() ),

    // 保证每次页面进来就加载这个
    init: () => future(async() => { 
        // 根据 ID 提取 缓存数据
        const cache: ReportDataTableCache | undefined = report_cache_util.get_data_in_cache( prp.schema.id )
        if (cache) {
            report_cache_util.repalce_data_to_schema( cache, prp.schema )
            // cache data
            console.log('== 刷新 LAND 页面，有缓存。。。。。。。。。。', cache) 
        }
        else {
            console.log('== 刷新 LAND 页面，无缓存。。。。。。。。。。') 
            data.value.length = 0
        }
        // 查询首次 表格信息
        const cols: OTableColumn[] = prp.schema.__tbo_columns
        if (is_nice_arr(cols)) {

        }
        else {
            await tbo.value.__msg()
        }
        // 初始化 
        dynamic_pager_util.init_dynamic(dynamic, prp.schema.__tbo_total)
        console.log('初始化后的 dynamic =', dynamic)
        // 完成初始化，同步 schemas 到磁盘
        await reportDPDispatch('async_schema', prp.schemas)
    })
}

// 解决 子对象先刷出来，prp.aii.num 初次变动无响应的问题
nextTick(funn.init)
watch(() => prp.aii.num, () => nextTick(funn.init))
</script>