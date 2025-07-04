<template>
    <view class="o-safe-area-top" :style="styie"></view>
</template>

<script setup lang="ts">
import { get_safe_area_top_h } from '@/tool/uni/uni-app';

const styie = {
    'height': get_safe_area_top_h() + 'px'
}
</script>