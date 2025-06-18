<template>
    <view :class="clazz">
        <CkSex :sex="sex ? sex : 0"/>
        <view class="d-ib">
            {{ age || 18 }}
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSex from '@/cake/visual/ider/CkSex.vue';
const prp = defineProps<{
    age?: number,
    sex?: number,
    clazz?: string
}>()

</script>