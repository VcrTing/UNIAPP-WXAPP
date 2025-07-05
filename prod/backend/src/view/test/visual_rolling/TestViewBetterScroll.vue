<template>
    <view ref="bscroii" :class="clazz" class="b-scroii" id="bscroii">
        <view>
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { promise } from '@/tool/util/future';
import BScroll from '@better-scroll/core'
defineProps<{ clazz?: string }>()
const bscroii = ref()
const bs = ref()
const conf = {
            freeScroll: true,
            bounce: {
                top: false,
                left: false,
                right: false,
                bottom: false
            }
        }

const funn = {
    init: () => promise(() => {
        const domm: UniApp.NodesRef = uni.createSelectorQuery().select('#bscroii')
        bs.value = new BScroll(domm, conf)
    })
}
// nextTick(funn.init)
</script>

<style lang="sass">
.b-scroii
    height: 300px
    width: 100%
    background: #f6f6f6
</style>