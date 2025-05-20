<template>
    <view>
        <CkSex :sex="sex ? sex : 1"/>
        <view class="d-ib">
            {{ age }}
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSex from './CkSex.vue';
const prp = defineProps<{
    age?: number,
    sex?: number
}>()

</script>