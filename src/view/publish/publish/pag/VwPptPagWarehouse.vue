<template>
    <view class="px-row">
        <view>
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishViewItem :v="v" @tap="funn.edit(v)">
                    <view>&nbsp;</view>
                    <view class="pr-row pt">
                        <view>
                            <view class="err fx-r fx-b">
                                <text class="pr-t">待发布</text>
                                <!--<UiI :i="'b'"/>-->
                            </view>
                        </view>
                    </view>
                </CoMoPublishViewItem>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import uniRouter from '@/tool/uni/uni-router';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    items: mock_publish.now
})

const funn = {
    edit: (v: ONE) => {
        uniRouter.gopg('publish_edit')
    }
}
</script>