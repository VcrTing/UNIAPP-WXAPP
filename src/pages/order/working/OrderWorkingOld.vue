<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar @back="funn.back" :mat="true"></CoAppTopBackBar>
        <view>
            <VwOrderWorkingTop :item="orders[0]"/>
            <view class="order-woring-msg ps-r zi">
                <VwOrderWorkingMsg class="px-row pb-row" :item="orders[0]"/>
                <VwOrderWorkingAddr class="px-row" :item="orders[0]" />
                <view class="px-row py-row">
                    <OButton clazz="mh-btn" @tap="uniRouter.back">
                        确认及返回
                    </OButton>
                </view>
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authState, orderReFresh, orderState, uiState } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr } from '@/tool/util/valued';
import VwOrderWorkingAddr from '@/view/order/working/VwOrderWorkingAddr.vue';
import VwOrderWorkingMsg from '@/view/order/working/VwOrderWorkingMsg.vue';
import VwOrderWorkingTop from '@/view/order/working/VwOrderWorkingTop.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const view = computed(() => acyState.view)
const user = computed(() => authState.user)

const aii = reactive({
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const orders = computed((): OrderItem[] => {
    let res: OrderItem[] = must_arr(orderState.orders_of_iive) || <OrderItem[]>[ ]
    if (res) {
        return res;
    }
    else {
        res = <OrderItem[]>[
            { one: mock_orders.items[0], assistant: { } }
        ]
    }
    console.log('res =', res)
    return res;
})

const funn = {
    submit: (src: ONE) => {
        
    },
    back: () => {
        uniRouter.back()
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *;

page, uni-page-body
	background: $pri-pag-bg

</style>