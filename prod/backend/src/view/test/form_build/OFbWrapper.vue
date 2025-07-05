<template>
    <view>
        <view v-if="prp.list">
            <o-fb-item :many="prp.list" :one="null" :config="prp.config"></o-fb-item>
        </view>
        <view v-else>
            NULL 组件
        </view>        
    </view>
</template>

<script setup lang="ts">
import { arrhas } from '@/tool/util/iodash';
import OFbItem from './OFbItem.vue';

const prp = defineProps<{ list: MANY, config: ONE }>()


</script>