<template>
    <view>
        <view class="pt-x2">
            <CoDatePicker :def="aii.dt"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoDatePicker from '@/components/form/picker/CoDatePicker.vue';
import { reactive } from 'vue';

/*
const prp = defineProps<{

}>()
*/

const aii = reactive({
    dt: '2025-12-12',
    tim: '23:23'
})

</script>