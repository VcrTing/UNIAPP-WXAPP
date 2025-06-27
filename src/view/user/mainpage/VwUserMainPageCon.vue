<template>
    <view>
        <view class="pt-s bg-con">
            <view class="fx-i zi-s">
                <CoHeaderTabItem class="w-333" 
                    @tap="aii.iive = i" :iive="aii.iive == i" :tit="v.tit"
                    v-for="(v, i) in tabs" :key="i">
                </CoHeaderTabItem>
            </view>
            <view class="zi-t bd-b w-100 bd-c-s"></view>
        </view>
        <view>
            <view>
                <view v-if="aii.iive == 0" class="pb-row">
                    <VwUmpPubGallery :medias="data.activityMedias"/>
                </view>
                <view v-if="aii.iive == 1" class="py-row">
                    <CoEmpty/>
                </view>
                <view v-if="aii.iive == 2" class="py-row">
                    <CoEmpty/>
                </view>
            </view>
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
        </view>
    </view>
</template>

<script setup lang="ts">
import { authGetters } from '@/memory/global';
import { computed, reactive } from 'vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CoHeaderTabItem from '@/components/element/tabs/CoHeaderTabItem.vue';
import VwUmpPubGallery from './publisher/VwUmpPubGallery.vue';

const prp = defineProps<{
    user: ONE, data: UserMainPage
}>()

const aii = reactive({
    iive: 0,
})

// const is_publisher = computed(() => prp.user.publisher)

const tabs = computed((): MANY => {
    return [
        { tit: '个人相册', v: 0 },
        // { tit: '她的发布', v: 1 },
        // { tit: '历史活动', v: 2 },
    ]
})
</script>