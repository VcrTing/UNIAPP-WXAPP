<template>
    <view class="d-ib" :class="clazz">
        <text v-if="sex === DEV_GENDER.BOY" class="sex-boy c-p ani-scaie-aii __btn-sex">♂</text>
        <text v-else class="sex-girl c-p ani-scaie-aii  __btn-sex">♀</text>
    </view>
</template>

<script setup lang="ts">
import { DEV_GENDER } from '@/conf/conf-dev';
import { computed } from 'vue';

const prp = defineProps<{
    sex: number | undefined,
    bg?: boolean,
    clazz?: string
}>()

const clazz = computed((): string => {
    let res = ''
    if (prp.bg && prp.sex) {
        if (prp.sex >= DEV_GENDER.BOY) {
            res = 'btn-sex-boy '
        }
        else {
            res = 'btn-sex-girl '
        }
    }
    return res + ' ' + prp.clazz
})
</script>