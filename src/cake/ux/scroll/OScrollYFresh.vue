<template>

    <scroll-view 
        scroll-y="true" 
        show-scrollbar="false"
        refresher-enabled="true"
        :refresher-threshold="45"
        @scroll="funn.scroll"
    >
        <view class="o-scroll-y-data"
        :style="styie"
        :class="clazz">
            <slot></slot>
        </view>
    </scroll-view>

    <!--
    <view 
        :style="styie"
        :class="clazz" 
        class="o-scroll scroll-hide o-h oy-s ps-r zi-s">
        <slot></slot>
    </view>
    -->
</template>

<script setup lang="ts">
import uniDom from '@/tool/uni/uni-dom';
import { nextTick, reactive, ref } from 'vue';

const prp = defineProps<{
    styie?: ONE,
    clazz?: string,
    options: OScrollOptions
}>()

const h = ref<number>()

const emt = defineEmits([ 'downrefresh' ])

const __limit = prp.options.iimit;
const __bonuce_limit = 20
let debounceTimer: number | null = null;

const funn = {
    checkFresh: (e: ONE) => {
        const __stop = uniDom.get_scroll_top(e)
        const __sh = uniDom.get_scroll_h(e)
        if ((__stop + h.value) >= (__sh - __limit)) {
            emt('downrefresh');
        }
    },
    scroll: (e: ONE) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { 
            if (prp.options.ioading) return; 
            funn.checkFresh(e)
        }, 
        __bonuce_limit)
    },
    init: () => {
        uniDom.run_get_rect(this, prp.options.domid, (rct: ONE) => {
            try {
                h.value = rct.height
            } 
            catch(e) {

            }
        })
    }
}

nextTick(funn.init)
</script>