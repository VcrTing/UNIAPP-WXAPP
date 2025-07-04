<template>
    <view>
        <view class="py-row">
            <view class="py-row fx-s pi-row">
                <view class="header-s">推荐</view>
                <view>
                    <ODiv clazz="fx-r px-row fs-n tis"><view class="pr-t">查看更多</view><UiI :i="'r'"/> </ODiv>
                </view>
            </view>
            <view class="pt px-row">
                <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                    <CoMoPublishViewItem :v="v"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

const aii = reactive({
    items: mock_publish.history
})

</script>