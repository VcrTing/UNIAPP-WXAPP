<template>
    <view class="fx-i">
        <view :class="clazz">
            <CkAvatar v-if="v" :clazz="'w-3em h-3em'" :id="v.id" :src="v.avatarUrl"/>
            <view v-else class="w-3em h-3em"></view>
        </view>
        <view class="fx-1 px">
            <view class="fx-i h7">
                <text>{{ v.nickName }}</text>
                <CkAgeSex :age="v.age" :sex="v.gender"/>
            </view>
            <view class="">
                <view class="pt-s fs-n tid">
                    <text>个人简介:</text><text class="pi-s">{{ v.introduction || '无' }}</text>
                </view>
                <view class="pt-s fs-s tis">
                    <text>社交账号:</text><text class="pi-s">{{ v.socialAccount || '无' }}</text>
                </view>
            </view>
        </view>
        <view>
            <slot></slot>
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