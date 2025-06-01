<template>
    <view class="">
        <view class="">
            <view class="fx-i">
                <view class="btn-def py px-row" v-for="(v, i) in tabs" :key="i"
                    @tap="aii.i = i"
                ><text :class="(aii.i == i) ? '' : 'sus'">{{ v.tit }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishWorkingItem :v="v" @tap="funn.edit(v)">
                    <view>&nbsp;</view>
                    <view class="pr pt">
                        <view class="fx-r tis fs-s">
                            <UiI :i="'lock'"/>
                            <text class="pi-s">私密</text>
                        </view>
                    </view>
                </CoMoPublishWorkingItem>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishWorkingItem from '@/components/modules/publish/CoMoPublishWorkingItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

const tabs = [
    { tit: '公开类型', },
    { tit: '非公开', },
]
// const prp = defineProps<{}>()
const aii = reactive({
    items: mock_publish.now, i: 0
})

const funn = {
    edit: (v: ONE) => {
        uniRouter.gopg('publish_edit')
    }
}
</script>