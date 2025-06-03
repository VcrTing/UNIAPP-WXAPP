<template>
    <view class="">
        <view class="">
            <view class="fx-i">
                <view class="btn-def py px-row" v-for="(v, i) in tabs" :key="i"
                    @tap="funn.switchTab(v)"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <CoViDataLoading :ioading="ioading" :items="data">
                <view class="pb-row" v-for="(v, i) in data" :key="i">
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
            </CoViDataLoading>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishWorkingItem from '@/components/modules/publish/CoMoPublishWorkingItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_ACTIVITY_TYPED, DATA_ACTIVITY_TYPED_DEF } from '@/conf/conf-datas';
import mock_publish from '@/server/mock/publish/mock_publish';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';


const prp = defineProps<{
    items: Activity[], ioading: boolean
}>()

const aii = reactive({
    i: DATA_ACTIVITY_TYPED_DEF.v
})

// 公开与非公开过滤
const data = computed((): Activity[] => {
    return must_arr(prp.items).filter(e => (e.typed || 0) == aii.i)
})

const funn = {
    edit: (v: ONE) => {
        uniRouter.gopg('publish_edit')
    },
    switchTab: (v: ONE) => {
        aii.i = v.v
    }
}

const tabs = DATA_ACTIVITY_TYPED
</script>