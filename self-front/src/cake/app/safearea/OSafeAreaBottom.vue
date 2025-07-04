<template>
    <view v-show="iive" class="o-safe-area-bottom">
    </view>
    <view v-if="!has_document" class="pt"></view>
</template>

<script setup lang="ts">
import { appState } from '@/memory/global';
import { computed, ref } from 'vue';

const iive = ref(true)
const has_document = computed(() => appState.document)
</script>