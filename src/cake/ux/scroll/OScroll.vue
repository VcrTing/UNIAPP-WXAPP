<template>
    
    <scroll-view 
        :scroll-y="true" 
        :scroll-x="true" 
        :show-scrollbar="false"

        :refresher-enabled="false"
        :refresher-threshold="45"

        :lower-threshold="lower_threshold ? lower_threshold : 120"
        @refreshrefresh="funn.refreshrefresh"

        @scrolltolower="funn.scrolltolower"
        @scrolltoupper="funn.scrolltoupper"
    >
        <view
            :style="styie"
            :class="clazz"
        >
            <slot></slot>
        </view>
    </scroll-view>

</template>

<script setup lang="ts">
defineProps<{
    clazz?: string,
    styie?: ONE,
    lower_threshold?: number
}>()

const emt = defineEmits([ 'refresh', 'scrolltolower' ])

const me = reactive({
    rolling: false
})

const funn = {
    scrolltoupper: (e: ONE) => {
        const _d: string = e.detail.direction
        if (_d == 'top') {
            console.log("scrolltoupper =", e)
        }
        return 
    },
    scrolltolower: (e: any) => {
        if (me.rolling) return
        me.rolling = true
        const _d: string = e.detail.direction
        if (_d == 'bottom') emt('scrolltolower')
        setTimeout(() => me.rolling = false, 200)
    },

    scroll: (e: any) => {
        // @scroll="funn.scroll"
        // console.log("scroll =", e)
    },
    refreshrefresh: (e: any) => {
        console.log("refreshrefresh =", e)
    }
}
</script>