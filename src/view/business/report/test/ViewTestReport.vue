<template>
    <view class="h-100">
        <co-app-top-bar>
            <view class="pb pt-s">
                <co-app-bar-header>
                    销售订单
                </co-app-bar-header>
            </view>
            <ViewTestReportTop :schemas="aii.schemas" @tab="(n: number) => aii.tab = n"/>
        </co-app-top-bar>

        <!-- 垫 top -->
        <view class="py">
            <o-safe-area-top/>
            <view class="pt pb-s"></view>
        </view>

        <view class="px-row">
            <!-- 表单内容 -->
            <view v-for="(sc, i) in aii.schemas" :key="i">
                <ViewTestReportInner 
                    v-show="i == aii.tab"
                    :code="code"
                    :aii="aii"
                    :schema="sc"
                    :schemas="aii.schemas"
                    ref="table"/>
            </view>
        </view>

        <view class="">
            <o-pan :idx="0">
                <o-pan-inner-x :idx="0" :mxw="'61.8vw'" :close="true">
                    <ViewReportPanTableItemDetail :idx="0" @close="pan_tooi.close_pan(0)"/>
                </o-pan-inner-x>
            </o-pan>
            <o-pan :idx="10">
                <o-pan-inner-y :idx="10" :h="'60vh'" :orientation="'b'">
                    <ViewReportPanTableFilter :schemas="aii.schemas"/>
                </o-pan-inner-y>
            </o-pan>
        </view>
    </view>
</template>

<script setup lang="ts">
import { future } from '@/tool/util/future';
import ViewTestReportTop from './ViewTestReportTop.vue'
import ViewTestReportInner from './ViewTestReportInner.vue';
import ViewReportPanTableItemDetail from '../table/pan/ViewReportPanTableItemDetail.vue'
import ViewReportPanTableFilter from '../table/pan/ViewReportPanTableFilter.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import { reportWareHouseDispatch } from '@/pages/report/_memory/report-page-working-store';

// 这个 CODE 是必须先准备好的
const code = ref('1651716406')

const aii = reactive({
    ioading: false,
    tab: 0, // 切换视图的代码
    schemas: <ReportSchema[]> [ ],
})

const funn = {
    search: () => {

    },
    // 初始化
    init: () => future(async () => {
        const _code: string = code.value
        if (_code) {
            // 获取结构，磁盘穿透 + 网络穿透
            const _shemas: ReportSchema[ ] | undefined = await reportWareHouseDispatch('init_schema', _code)
            if (_shemas) {
                aii.schemas = _shemas
                console.log('获得到的结构 =', _shemas)
            } else {
                console.log('没获取到，跳转登录')
                // goLogin()
            }
        }
        else {
            console.log("CODE 没有准备好，跳转登录")
        }
    }),
}

nextTick(funn.init)
</script>