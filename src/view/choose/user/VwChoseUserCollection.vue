<template>
    <view>
        <view class="px-row">
            <view class="header-s">收藏夹</view>
        </view>
        <view class="py"></view>
        <OScrollX>
            <view class="fx-i">
                <view class="w-6em" v-for="(v, i) in meizi" :key="i">
                    <view class="px-s py-s br fx-aii-btn-def w-6em">
                        <CoMoActivityJoinerBlock :v="v"/>   
                    </view>
                </view>
            </view>
        </OScrollX>
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoMoActivityJoinerBlock from '@/components/modules/activity/CoMoActivityJoinerBlock.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import { computed } from 'vue';

// const prp = defineProps<{}>()
const meizi = computed(() => {
    return mock_meizi.items
})
</script>