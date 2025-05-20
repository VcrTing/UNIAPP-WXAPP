<template>
    <view class="d-ib">
        <text v-if="sex" class="sex-boy">♂</text>
        <text v-else class="sex-girl">♀</text>
    </view>
</template>

<script setup lang="ts">
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    sex: number
}>()

</script>