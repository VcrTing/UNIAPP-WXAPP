<template>
    <view>
        A
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{ one: ONE, config: ONE }>()
console.log("ONE = ", prp.one)
</script>