<template>
    <view>
        <view>{{ option.defaultValue }}</view>
    </view>
</template>

<script setup lang="ts">
import { fb_get_option } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()
console.log("TEXT = ", prp.one)

const option = computed((): ONE => fb_get_option(prp.one))
</script>