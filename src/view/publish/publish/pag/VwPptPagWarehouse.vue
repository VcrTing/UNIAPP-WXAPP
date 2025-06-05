<template>
    <view>
        <view class="">
            <view class="fx-i">
                <view class="btn-def py px-row" v-for="(v, i) in tabs" :key="i"
                    @tap="aii.i = v.v"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <!-- 待完善 -->
            <view v-if="aii.i == 0">
                <CoViDataLoading :ioading="ioading" :items="data">
                    <view class="pb-row" v-for="(v, i) in data" :key="i">
                        <CoMoPublishViewItem :v="v" @tap="funn.edit(v)">
                            <view class="fx-r tis fs-s btn-err px-t">
                                <text class="pi-s">
                                    待完善
                                </text>
                            </view>
                        </CoMoPublishViewItem>
                    </view>
                </CoViDataLoading>
            </view>
            <view v-else-if="aii.i == 1">
                <CoViDataLoading :ioading="ioading" :items="data">
                    <view class="pb-row" v-for="(v, i) in data" :key="i">
                        <CoMoPublishViewItem :v="v" @tap="funn.edit(v)">
                            <view class="fx-r tis fs-s btn-err px-t">
                                <text class="pi-s">
                                    审核中，预计30分钟
                                </text>
                            </view>
                        </CoMoPublishViewItem>
                    </view>
                </CoViDataLoading>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_ACTIVITY_REVIEW, DATA_ACTIVITY_REVIEW_DEF } from '@/conf/conf-datas';
import { pagePublishDispatch } from '@/memory/page';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    items: Activity[], ioading: boolean
}>()

const aii = reactive({
    i: DATA_ACTIVITY_REVIEW_DEF.v
})

// 待完善
const data = computed((): Activity[] => func.filter(aii.i))

const func = {
    filter: (v: number) => {
        return must_arr(prp.items).filter(e => {
            const cd: number = e['dataStatus'];
            if (cd == v) { return true }
            return false
        })
    }
}

const funn = {
    edit: async (v: ONE) => {
        await pagePublishDispatch('change', [ 'edit', v ])
        uniRouter.gopg('publish_edit')
    },
    init: () => promise(() => {
        aii.i = 0
    })
}

const tabs = DATA_ACTIVITY_REVIEW
</script>