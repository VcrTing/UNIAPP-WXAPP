<template>
        <view v-if="schemas">
            <view class="px-row soft" v-if="schemas.length > 0">
                <!-- 表单内容 -->
                <view class="soft" v-for="(sc, i) in schemas" :key="i">
                    <view
                        class="soft"
                        v-if="sc.__tab_iive"
                    >
                        <ViewReportDataLand :schema="sc" :aii="me" :schemas="schemas"/>
                    </view>
                </view>
            </view>
            <view v-else class="soft ta-c py">
                加载结构中...
            </view>

            <view class="">
                <!--
                <o-pan :idx="0">
                    <o-pan-inner-x :idx="0" :mxw="'61.8vw'" :close="true">
                        <ViewReportPanTableItemDetail :idx="0" @close="pan_tooi.close_pan(0)"/>
                    </o-pan-inner-x>
                </o-pan>
                -->
                <o-pan :idx="10">
                    <o-pan-inner-y :idx="10" :h="'60vh'" :orientation="'t'">
                        <ViewReportPanTableFilter :schemas="schemas"/>
                    </o-pan-inner-y>
                </o-pan>
            </view>
        </view>
</template>

<script setup lang="ts">
import ViewReportDataLand from './table/ViewReportDataLand.vue';
import ViewReportPanTableFilter from './pan/ViewReportPanTableFilter.vue';
const prp = defineProps<{
    deploy: ReportPageDeploy | ONE,
    schemas: ReportSchema[] | undefined
}>()

const me = reactive({
    ioading: false, // 控制是否处于加载状态
    num: 0 // 控制刷新
})

const funn = {
    refresh: () => (me.num += 1)
}

defineExpose(funn)
</script>