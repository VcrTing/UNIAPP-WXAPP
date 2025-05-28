<template>
    <view>
        <CkSex :sex="sex ? sex : 0"/>
        <view class="d-ib">
            {{ age }}
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSex from '@/cake/visual/ider/CkSex.vue';
const prp = defineProps<{
    age?: number,
    sex?: number
}>()

</script>