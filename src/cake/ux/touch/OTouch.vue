<template>
    <view @tap="touch">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { UX_DOUBLE_TOUCH_JUDGE_TIME } from '@/conf/conf-app';

// const prp = defineProps<{}>()
const emt = defineEmits([ 'dbtouch', 'touch' ])
const t = ref<number>(0)
const f = ref<any>(null)

const touch = (i: number) => {
    const nowTime = new Date().getTime()
    const lastTime = t.value
    t.value = nowTime

    const diff = nowTime - lastTime

    if (diff < UX_DOUBLE_TOUCH_JUDGE_TIME) {
        emt('dbtouch')
        console.log('双击事件')
        clearTimeout(f.value)
    }
    else {
        f.value = setTimeout(() => {
            emt('touch')
            console.log('单击事件')
        }, UX_DOUBLE_TOUCH_JUDGE_TIME)
    }
}
</script>