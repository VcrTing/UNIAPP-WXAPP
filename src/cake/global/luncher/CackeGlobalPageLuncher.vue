<template>
    
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { appState } from '../../../memory/global'

const page = computed((): string => appState.page)

watch(page, (n: string) => {
    if (n) {

    }
    else {
        console.log("-----> 不跳转 PAGE 页面")
    }
})
</script>