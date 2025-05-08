<template>
    
    <!-- 虚拟滚动改造的 -->
    <co-report-table-scroll
        :clazz="'tbo-def'"
        :ioading="ioading"
        :data="data"

        :unit="'rem'"
        :h="me.h_wrapper_rem"
        :h_th="me.h_th_rem"
        :h_td="me.h_td_rem"

        :w_column_px="w"

        ref="scroii"
        @result="funn.async_scroll"
        @feedback_item_h_px="(h: number) => me._h_item_px = h"
    >
        <template #header>
            <view class="th br-0-imp fx-s">
                <o-trangle-group
                    :style="v.__style" 
                    :class="v.__class"
                    :idx="i"
                    :disabled="prp.ioading"
                    class="td soft tbo-trangle-group br-0-imp"
                    ref="trangle"
                    @result="(n: number) => funn.sort(v, n, i)"
                    v-for="(v, i) in columns" :key="i"
                >
                    <view class="mh-tr fx-c fw-550">{{ v.__tit }}</view>
                </o-trangle-group>
            </view>
        </template>
        <template #body>
            <view 
                v-for="(d, idx) in aii.visuai" :key="d ? d.id : idx"
                class="tr visuai-scroii-item fx-s"
                :style="{
                    'height': me._h_item_px + 'px'
                }"
                :class="tbo_tr_class(index + idx)"
            >
                <view 
                    :style="v.__style" 
                    :class="v.__class"
                    class="td"
                    v-for="(v, i) in columns" :key="i"
                >
                    <o-touch
                        v-if="v.__kiy != '#'"
                        class="td-inner scroll-hide"
                        @dbtouch="emt('dbtouch', [ i, idx, d, v.__kiy, columns ])"
                        >
                        {{ aii.visuai[ idx ][ v.__kiy ] }}
                    </o-touch>
                    <o-touch
                        v-else
                        class="td-inner scroll-hide"
                        @dbtouch="emt('dbtouch', [ i, idx, d, v.__kiy, columns ])"
                        >
                        {{ index + idx }}
                    </o-touch>
                </view>
            </view>
        </template>
    </co-report-table-scroll>
</template>

<script setup lang="ts">
import { reportDWState } from '@/pages/report/_memory/report-page-working-store';
import tbo_tooi, { tbo_tr_class } from '@/tool/app/tbo_tooi';
import { promise, promising } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    ioading: boolean,
    columns: OTableColumn[],
    data: MANY,
    dynamic: DynamicPager,
    clazz_tbody?: string
}>()

const scroii = ref()
const trangle = ref()
const emt = defineEmits([ 'dbtouch', 'sort' ])

const w = computed(() => tbo_tooi.computed_columns_w(prp.columns))

const aii = reactive({
    visuai: <MANY>[ ]
})

// 用于计算 index 的 star，要求实时同步
const index = ref<number>(0)

const me = reactive({
    h_wrapper_rem: 38, // wrapper 的高度，相当于 tbody 的高度
    h_td_rem: 2.6, // 2.2, // 3rem 每行高
    h_th_rem: 3.2, // 3.2rem tr 高度
    _h_item_px: 42, // 42px // 会被重写
    unit: 'rem',
    ioading: false, // 内部控制防止误触
    reverse: false
})

const funn = {
    // 实时同步
    async_scroll: (fb: CoReportTableScrollFeedback) => {
        if (me.ioading) return;
        console.log()
        // 切割 数据
        const _dt: MANY = prp.data.slice(fb.star, fb.end)
        if (me.reverse) {
            // _dt.reverse()
        }
        aii.visuai = _dt
        index.value = fb.star + 1
        // 反馈给 dynamic
        prp.dynamic.star = fb.star
    },
    // 跳行
    walk: (num: number) => promise(() => {
        if (me.ioading) return; me.ioading = true 
        scroii.value.walk(num)
        me.ioading = false
        scroii.value.refresh()
    }),
    // 这里需要防止 重复 执行 clear_exclude_which_idx
    // 使用 promising 进行规范点击事件
    // 598 规范延迟
    sort: (c: OTableColumn, n: number, i: number) => promising(me, () => {
        if (me.reverse) {
            prp.data.reverse()
            me.reverse = true
        }
        else {
            me.reverse = false

            const k: string = n == 0 ? '' : c.__kiy
            if (k == '#') return;
            const v: string = tbo_tooi.sort_value(n)
            emt('sort', [ k, v ])
            must_arr(trangle.value).map((rf) => rf?.clear_exclude_which_idx(i))
        }
    }, 
    598),
    reset: () => must_arr(trangle.value).map((rf) => rf?.reset()) 
}

// 监听跳跃
const walk_num = computed(() => reportDWState.walk_num)
watch(walk_num, () => funn.walk(reportDWState.walk_value))

// data 变动
watch(() => prp.data, () => {
    console.log('数据变动')
    scroii.value.refresh()
})
</script>

<style lang="sass">
.visuai-scroii-item
    box-sizing: border-box
    padding: 0
    margin: 0
    border: none
</style>