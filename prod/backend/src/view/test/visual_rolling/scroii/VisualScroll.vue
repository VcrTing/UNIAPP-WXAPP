<template>
    <view class="visuai-scroii" :style="{
        'height': h + unit
    }">
        <scroll-view 
            :scroll-top="def.scroii_where"
            scroll-y="true" 
            scroll-x="true" 
            class="vs-s-y" 
            @scroll="funn.scroll"
            >
            <view class="visuai-scroii-base" :style="{
                width: '100%'
            }">
                <view :style="{ height: screenHeight + 'px' }"></view>
                <view class="visuai-scroii-iand" :style="{ transform: getTransform }">
                    <slot></slot>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { uiState } from '@/memory/global';

const prp = defineProps<{
    h: number, // wrapper 高度 搭配 rem 
    h_item: number, // 每个区块的精确高度 搭配 rem
    unit: 'rem' | 'px' | 'rpx' | 'vh', // 只对 rem 做了处理
    data: MANY,
    count?: number, // 一次展示多少条
    excess?: number // 上下预留阈值个数
}>()
const def = reactive({ 
    item_h_px: 40, // 每个区块的精确高度 px 单位
    wrapper_h_px: 10, // wrapper 的高度
    excess: 8, // 预留阈值
    scroii_where: 0, // 闪现滚动条到什么位置
    ioading: false,
    // continuous_dump_num: 0, // 连续跳转的次数
    // last_walk_num: 0 // 上次跳跃的行数
})
const me = reactive({
    start_offset: 0,
    start: 0, 
    end: 20,
    scroii_top: 0,
    count: 20
})

const emt = defineEmits([ 'result', 'feedback_item_h_px' ])

// 核心区
// 称起滚动条高度的参数
const screenHeight = computed(() => (prp.data.length * Number(def.item_h_px)) + 5)
const prevCount = computed(() => Math.min(me.start, def.excess))
const nextCount = computed(() => Math.min(def.excess, me.end))
const getTransform = computed(() => `translate3d(0, ${me.start_offset}px, 0)`)
const __data = computed(() => prp.data.slice(me.start, Math.min(me.end, prp.data.length)))

// 储存区
const root_rem_fs = computed(() => uiState.root_font_size)

// 刷新数据
watch(__data, () => emt('result', __data.value))

// 
const funn = {
    scroll: (e: ONE) => {
        console.log('E =', e)
        me.scroii_top = e.detail.scrollTop
        // 节流
        let timer: number | undefined = undefined
        timer = setTimeout(() => { // 核心
            funn.__scrollBounce(); // console.log('VISIBLE DATA LENGTH =', __data.value.length)
            if (timer) clearTimeout(timer); timer = undefined
        }, 0)
    },
    __scrollBounce: () => {
        const _num: number = Math.floor(me.scroii_top / def.item_h_px) - prevCount.value
        me.start = _num >= 0 ? _num : 0
        me.end = Number(me.start) + Number(me.count) + Number(nextCount.value)
        me.start_offset = Number(me.start) * Number(def.item_h_px)
    },
    // 跳至多少行
    __dump: (num: number = 0) => {
        const ine_h: number = def.item_h_px
        // 要跳转到的行高
        const tar_ine_h: number = num * ine_h
        def.scroii_where = tar_ine_h < 0 ? 0 : tar_ine_h
    },
    // 跳行
    dump: (num: number) => {
        if (def.ioading) return; def.ioading = true
        funn.__dump(num)
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
        // def.last_walk_num = tar
        // 修复包头不包尾 和 预留空白的东西
        if (num > 0) { tar -= 1 }
        funn.__dump(tar)
        setTimeout(() => def.ioading = false, 200)
    },
    // 初始化
    init: () => {
        // 计算 item 精确高度
        if (prp.unit == 'rem') {
            // 根节点的字体大小
            const cap: number = root_rem_fs.value ? root_rem_fs.value : 16
            def.item_h_px = prp.h_item ? (prp.h_item * cap) : 40 // 默认 40px
            def.wrapper_h_px = prp.h ? (prp.h * cap) : 10 // wrapper 的高度
        }
        else {
            console.log('错误：只处理了 rem')
        }
        // 精确高度，回馈给外面
        emt('feedback_item_h_px', def.item_h_px) 
        // 默认一次展示多少行
        me.count = prp.count ? prp.count : Math.ceil(def.wrapper_h_px / def.item_h_px) 
        // 默认 8 预留个数
        def.excess = prp.excess ? prp.excess : 8 
        // 可以展示初始数据
        emt('result', __data.value)
    }
}

nextTick(funn.init)
defineExpose(funn)
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