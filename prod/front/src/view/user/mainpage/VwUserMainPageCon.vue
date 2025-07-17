<template>
    <view>
        <view class="bf-s bf-wht-t">
            <view class="fx-i zi-s">
                <CoHeaderTabItem clazz="w-333"
                    @tap="aii.iive = i" :iive="aii.iive == i" :tit="v.tit"
                    v-for="(v, i) in tabs" :key="i">
                </CoHeaderTabItem>
            </view>
            <!--
            <view class="zi-t bd-b w-100 bd-c-s"></view>
            -->
        </view>
        <view class="" :class="aii.iive == 0 ? 'bg-pag-pri' : 'bg-con'">
            <view v-if="aii.iive == 0" class="pb-row softer">
                <VwUmpPubProducts :data="data"/>
            </view>
            <view v-if="aii.iive == 1" class="softer pt-s">
                <VwUmpPubGallery :data="data"/>
            </view>
            <view v-if="aii.iive == 2" class="py-row softer">
                <CoEmpty/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CoHeaderTabItem from '@/components/element/tabs/CoHeaderTabItem.vue';
import VwUmpPubGallery from './publisher/VwUmpPubGallery.vue';
import VwUmpPubProducts from './product/VwUmpPubProducts.vue';

defineProps<{
    user: ONE, data: UserMainPage
}>()

const aii = reactive({ iive: 0, })

const tabs = computed((): MANY => {
    return [
        { tit: '个人发布', v: 0 },
        { tit: '个人相册', v: 1 },
        // { tit: '她的发布', v: 1 },
        // { tit: '历史活动', v: 2 },
    ]
})

</script>


            <!--
            <view v-else>
                <view v-if="aii.iive == 0" class="py-row">
                    <CoEmpty/>
                </view>
                <view v-if="aii.iive == 1" class="py-row">
                    <CoEmpty/>
                </view>
                <view v-if="aii.iive == 2" class="py-row">
                    <CoEmpty/>
                </view>
            </view>
            -->