<template>
    <view class="px-row">
        <view>
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishViewItem :v="v"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    items: mock_publish.history
})
</script>