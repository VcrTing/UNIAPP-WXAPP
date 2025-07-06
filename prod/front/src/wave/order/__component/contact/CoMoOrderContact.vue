<template>
    <view>
        <view class="pt pb-s fx-aii-btn-def">
            <CkAvatar clazz="w-5em h-5em br" :src="v.avatarUrl" :id="''" :not_mainpage="true"/>
        </view>
        <view class="fx-aii-btn-def">
            <view class="fx-c px-row py-s">
                <text class="pr-s">{{ v.nickName }}</text>
                <CkSex :sex="v.gender"/>
                <CkAge :v="v.age"/>
            </view>
        </view>
        <view class="fx-aii-btn-def">
            <view class="fx-c py-s px-row">
                <OButtonTag clazz="fx-c br px-s py-t h9">
                    <CoImg clazz="w-2em h-2em fs-s br-cir" :src="DATA_WX_COVER.url"/>
                    <view>
                        <text class="px-s">请加微信：</text>
                        <text class="us-a">{{ v.socialAccount }}</text>
                    </view>
                </OButtonTag>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAge from '@/cake/visual/ider/CkAge.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_WX_COVER } from '@/conf/conf-datas';

const prp = defineProps<{
    v: User
}>()
</script>