<template>
    <view class="d-ib" :class="clazz">
        <text v-if="sex" class="sex-boy __btn-sex c-p ani-scaie-aii">♂</text>
        <text v-else class="sex-girl __btn-sex c-p ani-scaie-aii">♀</text>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    sex: number,
    bg?: boolean,
    clazz?: string
}>()

const clazz = computed((): string => {
    let res = ''
    if (prp.bg) {
        if (prp.sex >= 1) {
            res = 'btn-sex-boy '
        }
        else {
            res = 'btn-sex-girl '
        }
    }
    return res + ' ' + prp.clazz
})
</script>