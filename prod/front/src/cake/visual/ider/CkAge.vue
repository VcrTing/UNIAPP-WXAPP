<template>
    <view class="d-ib ani-scaie-aii">
        <view class="fx-aii-btn-def br-cir fx-c c-p"  :class="clazz">
            <text class="">{{ v }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const prp = defineProps<{
    v: number | undefined,
    bg?: boolean,
    clazz?: string
}>()

const clazz = computed((): string => {
    let res = ''
    return res + ' ' + prp.clazz
})
</script>