<template>
    <view>
        <view>
            <view class="fx-r py-s softer">
                <view class="fx-r fx-aii-btn-def ts c-p" @tap="funn.openfilter">
                    <text class="pr-s py-row pi-x1 tit">
                        {{ tab['name'] }}
                    </text>
                    <OFI clazz="pr-row py-row" :i="'b'"/>
                </view>
            </view>
        </view>
        <view class="px-row py-s">
            <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                <view class="pb-row softer" v-for="(v, i) in aii.items" :key="i">
                    <CoMoPublishViewItem :v="v">
                            <view class="fx-r tis fs-s btn-err px-t">
                                <text class="pi-s">
                                    {{ activity_tool.getstatus(v) }}
                                </text>
                            </view>
                    </CoMoPublishViewItem>
                </view>
            </CoViDataLoading>
        </view>

        <OPan :idx="pan.idx">
            <OPanInnerY :idx="pan.idx" :orientation="'b'">
                <view class="py-x2">
                    <view class="fx-c"><text class="header-s ls">选择过滤</text></view>
                </view>
                <view class="px-row">
                    <view>
                        <view class="py-s softer" v-for="(v, i) in tabs" :key="i"
                            @tap="funn.changefilter(v, i)"
                        >
                            <view class="py px ta-c fx-aii-btn-def br-1"
                                :class="aii.i == v.v ? 'bg-def' : ''"
                            >{{ v.name }}</view>
                        </view>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_ACTIVITY_STATUS, DATA_ACTIVITY_STATUS_DEF } from '@/conf/conf-datas';
import server_publish from '@/server/publish/server_publish';
import pan_tooi from '@/tool/app/pan_tooi';
import net_tool from '@/tool/http/net_tool';
import activity_tool from '@/tool/modules/activity_tool';
import { future, timeout } from '@/tool/util/future';
import { arrfind } from '@/tool/util/iodash';
import { computed, nextTick, reactive } from 'vue';

const pan = { idx: 20, hui: <ElePanHui>{ opacity: 0 } }
const tabs = DATA_ACTIVITY_STATUS

// const prp = defineProps<{}>()
const aii = reactive({
    items: <Activity[]>[ ], ioading: false,
    i: DATA_ACTIVITY_STATUS_DEF.v,
    param: { }, pager: net_tool.__pager(20)
})

const tab = computed((): Conf.Tab => {
    return arrfind<Conf.Tab>(tabs, aii.i, 'v')
})

const funn = {
    changefilter: (v: ONE, i: number) => {
        aii.i = v.v;
        pan_tooi.close_pan(pan.idx)
    },
    openfilter: () => {
        console.log('打开')
        pan_tooi.open_def_b(pan.idx, pan.hui)
    }
}

const func = {
    init: () => future(async () => {
        aii.ioading = true
        const dts: Activity[] = await server_publish.history(aii.param)
        aii.items = dts
        timeout(() => aii.ioading = false)
    })
}

nextTick(func.init)
</script>