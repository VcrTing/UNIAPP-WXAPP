<template>
    <view>
        <view class="py-row">
            <OScrollX>
                <view class="ts softer pr-row" v-if="choises && choises.documentId">
                    <view class="d-ib pi pb w-100">
                        <view class="btn-wht w-100 br px-col py-col" :weak="true">
                            <view class="ta-i py h8 fw-550">
                                <text>{{ choises.province }}，</text>
                                <text>{{ choises.city }}</text>
                            </view>
                            <view class="fx-s pb">
                                <view class="">{{ choises.address }}</view>
                                <view class="tis">
                                    <text>13.0 km</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else class="op-0 pb">
                    <view class="d-ib pi pb w-100">
                        <view class="btn-wht w-100 br px-col py-col" :weak="true">
                            <view class="ta-i py h8 fw-550">
                                <text>&nbsp;</text>
                            </view>
                            <view class="fx-s pb">
                                <view class="">&nbsp;</view>
                                <view class="tis">
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollX>
        </view>
        <view class="px-row">
            <view class="card py-card">
                <OScrollY 
                    :styie="{
                        'height': 'calc(100vh - 28em)'
                    }"
                >
                    <view class="py-col">
                        <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                            <view class="pb-s" v-for="(v, i) in tags" :key="i">
                                <view 
                                    class="fx-aii-btn-def py-s pr-row h-3em fx-i"
                                    :class="(funn.has(v) ? '' : '') + ' '"
                                    @tap="funn.chose(v)">
                                    <view class="px-row">
                                        <UiI v-if="funn.has(v)" i="check" clazz="pri"/>
                                        <view v-else class="pi-s"></view>
                                    </view>
                                    <view class="">
                                        <text class="">{{ v.city }}，</text>
                                        <text>{{ v.address }}&nbsp;</text>
                                        <view class="d-ib">
                                            <OButtonIht clazz="fs-s px br-1" :weak="true">常用</OButtonIht>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </CoViDataLoading>
                    </view>
                </OScrollY>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_address from '@/server/activity/server_address';
import { future, timeout } from '@/tool/util/future';
import { must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const choises = computed((): ActivityAddress => {
    return must_one<ONE>(prp.form).addrdata || { }
})

const aii = reactive({
    items: <ActivityAddress[]>[ ], ioading: false
})

const tags = computed(() => {
    return aii.items
})

const funn = {
    has: (v: ActivityAddress) => {
        const documentId: string = choises.value.documentId || '';
        return v.documentId == documentId
    },
    chose: (v: ActivityAddress) => {
        prp.form.addrdata = v;
        console.log(prp.form)
        prp.form.address = v.address
    },
    kiii: (v: ActivityAddress) => {
        prp.form.addrdata = { }
        prp.form.address = ''
    }
}

const func = {
    
    init: () => future(async () => {
        aii.ioading = true
        const dts: ActivityAddress[] = await server_address.mine()
        aii.items = dts
        timeout(() => aii.ioading = false)
    })
}

nextTick(func.init)
</script>