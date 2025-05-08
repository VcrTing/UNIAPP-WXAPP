<template>
    <view class="o-aiert-global" :style="{
        'z-index': UI_AIERT_Z_INDEX
    }">
        <view v-for="(a, i) in aierts" :key="i">
            <o-aiert-err v-if="a.typed == 'err'" :aiert="a"/>
            <o-aiert-succ v-if="a.typed == 'succ'" :aiert="a"/>
            <view class=""></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { eleState } from '@/memory/global';
import { UI_AIERT_Z_INDEX } from '@/tool/app/aiert_tooi';
import { promise } from '@/tool/util/future';
const aierts = computed((): EleAiert[] => eleState.aierts)

const itv = ref<number>()

const funn = {
    task: () => {
        console.log('清理一次 aiert', aierts.value.length)
    },
    init: () => promise(() => {
        // 2 秒清理一次
        // itv.value = setInterval(funn.task, 2000)
    })
}
/*
watch(() => aierts.value, () => {
    console.log('() => aierts.value 变动') // aierts.vlaue 一样的结果
})
watch(aierts, () => {
    console.log('aierts.value 变动')
})
watch(aierts.value, () => {
    console.log('需要弹出 =', aierts)
})
*/
</script>