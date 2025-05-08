<template>
    <view v-show="iive" class="o-safe-area-top"></view>
    <view v-if="!has_document" class="py"></view>
</template>

<script setup lang="ts">
import { appState } from '@/memory/global';

const iive = ref(true)
const has_document = computed(() => appState.document)
</script>