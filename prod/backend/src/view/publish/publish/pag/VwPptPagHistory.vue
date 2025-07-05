<template>
    <view>
        
        <view class="">
            <view class="fx-i softer">
                <view class="btn-def py px-row ts c-p" v-for="(v, i) in tabs" :key="i"
                    @tap="funn.switchTab(v)"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <!--
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
        -->
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
        <!--
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
        -->
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_ACTIVITY_TYPED_SM, DATA_PRODUCT_TYPED } from '@/conf/conf-datas';
import server_publish from '@/server/publish/server_publish';
import pan_tooi from '@/tool/app/pan_tooi';
import net_tool from '@/tool/http/net_tool';
import activity_tool from '@/tool/modules/activity_tool';
import { future, timeout } from '@/tool/util/future';
import { arrfind } from '@/tool/util/iodash';
import { computed, nextTick, reactive } from 'vue';

const pan = { idx: 20, hui: <ElePanHui>{ opacity: 0 } }
const tabs = DATA_PRODUCT_TYPED

// const prp = defineProps<{}>()
const aii = reactive({
    items: <Product[]>[ ], ioading: false,
    i: DATA_ACTIVITY_TYPED_SM.v,
    param: { }, pager: net_tool.__pager(20)
})

const funn = {
    switchTab: (v: Conf.Tab) => { aii.i = v.v },
}

const func = {
    init: () => future(async () => {
        aii.ioading = true
        const dts: Product[] = await server_publish.takeoff(aii.param)
        aii.items = dts
        timeout(() => aii.ioading = false)
    })
}

nextTick(func.init)
</script>