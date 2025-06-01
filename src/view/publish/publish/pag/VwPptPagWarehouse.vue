<template>
    <view>
        <view class="">
            <view class="fx-i">
                <view class="btn-def py px-row" v-for="(v, i) in tabs" :key="i"
                    @tap="aii.i = i"
                ><text :class="(aii.i == i) ? '' : 'sus'">{{ v.tit }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <view v-if="aii.i == 0">
                <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                    <CoMoPublishViewItem :v="v" @tap="funn.edit(v)">
                        <view>&nbsp;</view>
                        <view class="pr pt">
                            <view>
                                <view class="err fx-r fx-b">
                                    <text class="pr-t">待审核</text>
                                    <!--<UiI :i="'b'"/>-->
                                </view>
                            </view>
                        </view>
                    </CoMoPublishViewItem>
                </view>
            </view>
            <view v-else>
                
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const tabs = [
    { tit: '待审核', },
    { tit: '未通过', },
]

const aii = reactive({
    items: mock_publish.now, i: 0
})

const funn = {
    edit: (v: ONE) => {
        uniRouter.gopg('publish_edit')
    },
    init: () => promise(() => {
        aii.i = 0
    })
}
</script>