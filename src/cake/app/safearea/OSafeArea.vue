<template>
    <view v-show="iive" class="o-safe-area"></view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const iive = ref(true)
</script>