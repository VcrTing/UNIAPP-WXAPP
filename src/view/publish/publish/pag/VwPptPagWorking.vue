<template>
    <view class="">
        <view class="">
            <view class="fx-i softer">
                <view class="btn-def py px-row ts c-p" v-for="(v, i) in tabs" :key="i"
                    @tap="funn.switchTab(v)"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <view class="px-row py-s ani-fade-b">
            <CoViDataLoading :ioading="ioading" :items="data">
                <view :class="isphone ? '' : 'row'">
                    <view class="pb-row" v-for="(v, i) in data" :key="i"
                        :class="w_clazz"
                    >
                        <CoMoPublishWorkingItem :v="v" @view="funn.view(v)">
                            
                        </CoMoPublishWorkingItem>
                    </view>
                </view>
            </CoViDataLoading>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishWorkingItem from '@/components/modules/publish/CoMoPublishWorkingItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_ACTIVITY_TYPED, DATA_ACTIVITY_TYPED_GK } from '@/conf/conf-datas';
import { uiGetters } from '@/memory/global';
import open_of_activity from '@/server/__func/open_of_activity';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';


const prp = defineProps<{
    items: Activity[], ioading: boolean
}>()

const aii = reactive({
    i: DATA_ACTIVITY_TYPED_GK.v
})

// 公开与非公开过滤
const data = computed((): Activity[] => {
    return must_arr(prp.items).filter(e => (e.typed || 0) == aii.i)
})

const funn = {
    view: (v: Activity) => open_of_activity.view(v),
    edit: (v: ONE) => {
        uniRouter.gopg('publish_edit')
    },
    switchTab: (v: ONE) => {
        aii.i = v.v
    }
}

const tabs = DATA_ACTIVITY_TYPED


const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>