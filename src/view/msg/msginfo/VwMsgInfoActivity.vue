<template>
    <view>
        <view class="fx-i">
            <OButton color="def" :weak="true" class="px-row py-s tiw">未读</OButton>
            <OButton color="def" :weak="true" class="px-row py-s sus">已读</OButton>
        </view>
        <view class="">
        <OScrollY :styie="{
            height: 'calc(100vh - 10em)'
        }">
            <view class="px-row py-row" >
                <view v-if="msgs && msgs.length > 0">
                    <view>
                        <view class="py-s" v-for="(v, i) in msgs" :key="i">
                            <view class="card">
                                <view class="fx-aii-btn-def py px-x2">
                                    <view class="py">
                                        <text class="h6">不通过</text>
                                    </view>
                                    <view class="">
                                        <view class="tiw">{{ v.msg }}</view>
                                    </view>
                                    <view class="py">
                                        <view class="bg-hr h-1"></view>
                                    </view>
                                    <view class="fx-r">
                                        <text class="sus">05-27 12:23</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else class="pt-x2">
                    <CoEmpty/>
                </view>
            </view>
        </OScrollY>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import mock_msg from '@/server/mock/msg/mock_msg';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';

// const prp = defineProps<{}>()

const v = mock_orders.items[1]

const msgs = mock_msg.sys_notifies

const funn = {
    meizi: (n: number) => {
        return mock_meizi.items[n]
    }
}
</script>