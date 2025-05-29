<template>
    <view>
        <view class="fx-i">
            <OButtonDef :weak="true" class="px py-s tiw">未读</OButtonDef>
            <OButtonDef :weak="true" class="px py-s sus">已读</OButtonDef>
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
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';
import UiI from '@/ui/element/i/UiI.vue';

// const prp = defineProps<{}>()

const v = mock_orders.items[1]

const funn = {
    meizi: (n: number) => {
        return mock_meizi.items[n]
    }
}
</script>