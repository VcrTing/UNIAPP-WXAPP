<template>
    <view ref="bscroii" :class="clazz" class="b-scroii">
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
        bs.value = new BScroll(bscroii, conf)
    })
}
nextTick(funn.init)
</script>