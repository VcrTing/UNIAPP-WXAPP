<template>
    <view>
        <view v-if="ioading" class="softer">
            <CkDataIoading :h="prp.h || 10"/>
        </view>
        <view v-else>
            <view class="softer" v-if="items && items.length > 0">
                <slot></slot>
            </view>
            <view class="softer" v-else :style="styie">
                <CoEmpty/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkDataIoading from '@/cake/content/ioading/CkDataIoading.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import { computed } from 'vue';

const prp = defineProps<{
    ioading: boolean,
    items: MANY,
    h?: number
}>()

const styie = computed(() => {
    return {
        height: (prp.h || 10) + 'em'
    }
})
</script>