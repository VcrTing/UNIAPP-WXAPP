<template>
    <view class="px-row py-row fx-aii-btn-def">
        <view class="tis fs-n ta-r pt">
            <text class="pr-s">{{ must_arr(joins).length }}</text>
            <text>条参与记录</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    joins: ActivityJoin[ ]
}>()

</script>