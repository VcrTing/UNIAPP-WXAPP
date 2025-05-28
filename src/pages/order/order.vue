<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBar clazz="bg-con" :mat="true">
            <view class="fx-i">
                <view v-for="(v, i) in aii.tabs" :key="i" class="pb-s ts">
                    <OButtonIht v-if="aii.iive == i" :clazz="'mx ts'">
                        <text class="h7 fw-550">{{ v.tit }}</text>
                    </OButtonIht>
                    <view @tap="aii.iive = i" class="ts px-row py-s fx-aii-btn-def tid btn-rnd" v-else>{{ v.tit }}</view>
                </view>
            </view>
        </CoAppTopBar>
        <view class="">
            <view>
                <view>
                    <OButtonDef>
                        <text class="fs-n pr-t">深圳</text>
                        <UiI clazz="fs-s d-ib" :i="'b'"/>
                    </OButtonDef>
                </view>
            </view>
            <OScrollY :styie="{
                'height': 'calc(100vh - 8em)'
            }">
                <VwOrderNow v-if="aii.iive == 1"/>
                <VwOrderFail v-else-if="aii.iive == 2"/>
                <VwOrderHistory v-else/>
            </OScrollY>

            <CoBomBackBtn :clazz="'btn-wht-s'"/>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import { storage } from '@/tool/web/storage';
import UiI from '@/ui/element/i/UiI.vue';
import VwOrderAll from '@/view/order/aii/VwOrderAll.vue';
import VwOrderFail from '@/view/order/order/VwOrderFail.vue';
import VwOrderHistory from '@/view/order/order/VwOrderHistory.vue';
import VwOrderNow from '@/view/order/order/VwOrderNow.vue';
import { computed, onMounted, reactive } from 'vue';
// const prp = defineProps<{}>()

const code = computed(() => {
    return storage.get('PAGE_ORDER_KEY') || 0
})

const aii = reactive(<ONE>{
    doing: mock_orders.items[0],
    items: mock_orders.items,
    iive: 0,
    tabs: [
        { tit: '全部' },
        { tit: '进行中' },
        { tit: '已退出' },
    ]
})

onMounted(() => {
    aii.iive = code.value
})
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>