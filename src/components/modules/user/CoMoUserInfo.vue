<template>
    <view class="fx-i">
        <view :class="clazz">
            <CkAvatar v-if="v" :clazz="'w-3em h-3em'" :id="v.id" :src="v.avatarUrl"/>
            <view v-else class="w-3em h-3em"></view>
        </view>
        <view class="fx-1">
            <view class="fx-i h7 fx-aii-btn-def br-1">
                <view class=" d-ib py-t br-t px-s">{{ v.nickName }}</view>
                <CkAgeSex :age="v.age" :sex="v.gender" :clazz="'w-2em fx-aii-btn-def br-s py-s'"/>
            </view>
            
            <view class="fx-s">
                <view class="w-100">
                    <view class="fs-n tid py-t br-1 px-s fx-aii-btn-def ">
                        <text>个人简介:</text><text class="pi-s">{{ v.introduction || '无' }}</text>
                    </view>
                    <view class="fs-s tis py-t br-1 px-s fx-aii-btn-def ">
                        <text>社交账号:</text><text class="pi-s">{{ v.socialAccount || '无' }}</text>
                    </view>
                </view>
                <view>
                    <slot></slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

defineProps<{
    v: User,
    clazz?: string
}>()

</script>