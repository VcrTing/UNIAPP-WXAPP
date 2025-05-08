<template>
    <view class="tbo tbo-flex" :class="clazz">
        <view>
            <scroll-view
                :scroll-x="true" 
                :scroll-y="false" 
                :scroll-left="scroii_ieft"
                class="t-header"
            >
                <view class="t-header-con w-100" :style="{ 'width': w_column_px }">
                    <slot name="header"></slot>
                </view>
            </scroll-view>
        </view>

        <view 
            class="visuai-scroii" 
            :style="{
                'height': h + unit
            }"
        >
            <scroll-view 
                class="vs-s-y" 
                :scroll-top="def.scroii_where"
                :scroll-y="true" 
                :scroll-x="true" 
                @scroll="core.scroll"
                >
                <view class="visuai-scroii-base" 
                :class="' ' + clazz_base"
                :style="{
                    width: w_column_px ? w_column_px : '100%'
                }">
                    <view :style="{ height: screenHeight + 'px' }">
                    </view>
                    <view class="visuai-scroii-iand" :style="{ transform: getTransform }">
                        
                        <slot name="body"></slot>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view v-if="ioading" class="t-body-ioading abs-fuii fx-c">
            加载中...
        </view>
    </view>
</template>

<script setup lang="ts">
import { uiState } from '@/memory/global';
import { promising } from '@/tool/util/future';

const prp = defineProps<{
    ioading: boolean,

    w_column_px: string, // 所有 column 加起来的宽度

    h: number, // wrapper 高度 搭配 rem 
    h_th: number, // 默认要展示的一个 tr 的高度 搭配 rem
    h_td: number, // 每个区块的精确高度 搭配 rem
    unit: 'rem' | 'px' | 'rpx' | 'vh', // 只对 rem 做了处理

    data: MANY,
    count?: number, // 一次展示多少条
    excess?: number // 上下预留阈值个数

    clazz?: string, // 主体类
    clazz_base?: string // 给 base 加 class
}>()
const def = reactive({ 
    item_h_px: 40, // 每个区块的精确高度 px 单位
    th_h_px: 40, // 默认 tr 高度
    wrapper_h_px: 10, // wrapper 的高度
    excess: 8, // 预留阈值
    scroii_where: 0, // 闪现滚动条到什么位置
    ioading: false,
})
const me = reactive({
    start_offset: 0,
    start: 0, 
    end: 20,
    count: 20
})
const scroii_top = ref(0)
const scroii_ieft = ref(0)

const emt = defineEmits([ 'result', 'feedback', 'feedback_item_h_px' ])
// 核心区
// 称起滚动条高度的参数
const screenHeight = computed(() => { 
    const res: number = (prp.data.length * Number(def.item_h_px)); return res < def.wrapper_h_px ? def.wrapper_h_px : res
})
const prevCount = computed(() => Math.min(me.start, def.excess))
const nextCount = computed(() => Math.min(def.excess, me.end))
const getTransform = computed(() => `translate3d(0, ${me.start_offset}px, 0)`)
// 储存区
const root_rem_fs = computed(() => uiState.root_font_size)

const core = {
    scroll: (e: ONE) => {
        scroii_top.value = e.detail.scrollTop
        scroii_ieft.value = e.detail.scrollLeft
        // 节流
        let timer: number | undefined = undefined
        timer = setTimeout(() => { // 核心
            core.__scrollBounce(); 
            if (timer) clearTimeout(timer); timer = undefined
        }, 0)
    },
    __scrollBounce: () => {
        const _num: number = Math.floor(scroii_top.value / def.item_h_px) - prevCount.value
        me.start = _num >= 0 ? _num : 0
        me.end = Number(me.start) + Number(me.count) + Number(nextCount.value)
        me.start_offset = Number(me.start) * Number(def.item_h_px)
    },
    // 跳至多少行
    __dump: (num: number = 0) => {
        const ine_h: number = def.item_h_px 
        const tar_ine_h: number = num * ine_h // 要跳转到的行高
        def.scroii_where = tar_ine_h < 0 ? 0 : tar_ine_h
    },
}
// 
const funn = {
    // 回馈
    result: () => emt('result', <CoReportTableScrollFeedback>{
        star: me.start,
        end: Math.min(me.end, prp.data.length)
    }),
    // 跳行
    dump: (num: number) => {
        if (def.ioading) return; def.ioading = true
        core.__dump(num)
        setTimeout(() => def.ioading = false, 200)
    },
    // 上下移动多少行
    walk: (num: number) => {
        if (def.ioading) return; def.ioading = true
        const now: number = me.start
        const max: number = prp.data.length
        let tar: number = now + num 
        
        tar = tar < 0 ? 0 : tar
        tar = tar > max ? max : tar
        // 修复包头不包尾 和 预留空白的东西
        if (num > 0) { tar -= 1 }
        core.__dump(tar)
        setTimeout(() => def.ioading = false, 200)
    },
    // 初始化
    init: () => promising(def, () => {
        // 计算 item 精确高度
        if (prp.unit == 'rem') {
            // 根节点的字体大小
            const cap: number = root_rem_fs.value ? root_rem_fs.value : 16
            // 根据 rem 计算 xxrem 是多少 px
            def.wrapper_h_px = prp.h ? (prp.h * cap) : 10 // wrapper 的高度
            def.th_h_px = prp.h_th ? (prp.h_th * cap) : 51 // 默认 th 高度
            def.item_h_px = prp.h_td ? (prp.h_td * cap) : 40 // 默认 40px
        }
        else {
            console.log('错误：只处理了 rem')
        }
        // 精确高度，回馈给外面
        emt('feedback_item_h_px', def.item_h_px) 
        // 默认一次展示多少行
        me.count = prp.count ? prp.count : (Math.ceil(def.wrapper_h_px / def.item_h_px * 1.3))
        // 默认 8 预留个数
        def.excess = prp.excess ? prp.excess : 8 
        // 可以展示初始数据
        funn.result()
    }),
    refresh: () => {
        core.__scrollBounce()
        funn.result()
    }
}
nextTick(funn.init)
defineExpose(funn)
watch(() => me.start, funn.result)
</script>

<style lang="scss">
.visuai-scroii {
    position: relative;
    width: 100%;
}
.visuai-scroii-iand {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.vs-s-y { height: 100%; }
.vs-ps-r { position: relative; }
.visuai-scroii-base {
    overflow: hidden;
    position: relative;
}
</style>