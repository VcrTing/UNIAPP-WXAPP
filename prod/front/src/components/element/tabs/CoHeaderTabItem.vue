<template>
    <view class="py-s fx-aii-btn-def c-p"
        :class="iive ? 'bd-b-x2 bd-c-x2 ' + clazz : 'sus ' + clazz"
    >
        <view class="px py fx-c">
            <view class="h6 fw-550">{{ tit }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    iive: boolean,
    tit: string,
    clazz?: string
}>()

</script>