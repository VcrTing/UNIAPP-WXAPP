<template>
    <view>
        
        <view class="px-row py-row">
            <view class="h6 fw-550">妹子推荐</view>
        </view>
        <view class="py-row px-row-s">
            <view>
                <view class="d-ib px-row-s" v-for="(v, i) in aii.items" :key="i">
                    <view>
                        <CkAvatar :src="v.avatar" :clazz="'w-3em h-3em'"/>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import { reactive } from 'vue';

// const prp = defineProps<{}>()

const aii = reactive({
    items: mock_meizi.items
})
</script>