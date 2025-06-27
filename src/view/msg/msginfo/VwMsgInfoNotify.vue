<template>
    <view>
        <view class="fx-i">
            <OButton color="def" :weak="true" class="px-row py-s tiw">未读</OButton>
            <OButton color="def" :weak="true" class="px-row py-s sus">已读</OButton>
        </view>
        <OScrollY :styie="{
            height: 'calc(100vh - 22em)'
        }">
            <view class="px-row py-row">
                <view class="pt-x2">
                    <CoEmpty/>
                </view>
            </view>
        </OScrollY>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';

// const prp = defineProps<{}>()

const v = mock_orders.items[1]

const funn = {
    meizi: (n: number) => {
        return mock_meizi.items[n]
    }
}
</script>