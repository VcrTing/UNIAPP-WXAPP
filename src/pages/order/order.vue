<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBar clazz="bg-con" :mat="true">
            <view class="fx-i">
                <view v-for="(v, i) in aii.tabs" :key="i" class="ts">
                    <OButton :color="(aii.iive == v.v) ? 'pri-iht' : 'wht'" :weak="true" v-if="aii.iive == v.v" 
                        :clazz="'ts py px-row'">
                        <text class="fw-550">{{ v.name }}</text>
                    </OButton>
                    <view @tap="aii.iive = v.v" class="ts py px-row fx-aii-btn-pri-iht tid" v-else>{{ v.name }}</view>
                </view>
            </view>
        </CoAppTopBar>
        <view class="">
            <OScrollY :styie="{
                'height': 'calc(100vh - 8em)'
            }">
                <VwOrderNow v-if="aii.iive == 1" :joins="joins" :activities="aii.activities"/>
                <VwOrderHistory v-else/>
            </OScrollY>

            <CoBomBackBtn :clazz="'btn-wht-s'"/>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { for_user_joing } from '@/conf/__for_index/for_user_loging';
import { orderState, uiState } from '@/memory/global';
import server_activity from '@/server/activity/server_activity';
import { futuring, promise } from '@/tool/util/future';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import VwOrderFail from '@/view/order/order/VwOrderFail.vue';
import VwOrderHistory from '@/view/order/order/VwOrderHistory.vue';
import VwOrderNow from '@/view/order/order/VwOrderNow.vue';
import { computed, nextTick, reactive } from 'vue';
//
const code = computed(() => { return storage.get('PAGE_ORDER_KEY') || 0 })
//
const joins = computed((): ActivityJoin[] => orderState.join_of_mine)
// const len = computed((): number => must_arr(joins.value).length)

const aii = reactive(<ONE>{
    ioading: false,
    iive: 0,
    tabs: [
        { name: '全部', v: 0 },
        { name: '进行中', v: 1 },
        // { name: '已结束', v: 2 },
    ],
    activities: [ ]
})

const funn = {
    fiii_orders: () => futuring(aii, async () => {
        const jss: ActivityJoin[] = joins.value || <ActivityJoin[]>[ ]
        const ids: string[] = jss.map((e: ActivityJoin) => { 
            const act: Activity = e.activity || { }
            return act.documentId;
        })
        const orders: Activity[] = await server_activity.byids(ids)
        if (is_nice_arr(orders)) {
            aii.activities = orders;
            console.log('补充的 活动 =', orders)
        }
    }),
    init: () => promise(() => {
        aii.iive = code.value;
        // for_user_joing()
        funn.fiii_orders()
    })
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

                <!--
                <view>
                    <OButtonDef>
                        <text class="fs-n pr-t">深圳</text>
                        <UiI clazz="fs-s d-ib" :i="'b'"/>
                    </OButtonDef>
                </view>
                -->