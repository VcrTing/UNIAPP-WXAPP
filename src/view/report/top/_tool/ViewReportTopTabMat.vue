<template>
    <view v-if="schemas">
        <view class="d-ib btn py ts-0-imp" v-for="(v, i) in schemas" :key="i">
            &nbsp;
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    schemas: ReportSchema[] | undefined
}>()
</script>