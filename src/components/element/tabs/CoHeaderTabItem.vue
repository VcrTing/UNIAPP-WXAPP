<template>
    <view class="py-s"
        :class="iive ? 'bd-b-x2 bd-c-x2' : 'sus'"
    >
        <view class="px py fx-c">
            <view class="h6 fw-550">{{ tit }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    iive: boolean,
    tit: string
}>()

</script>