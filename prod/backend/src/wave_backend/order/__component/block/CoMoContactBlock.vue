<template>
    <view class="fx-aii-btn-def">
        <view :class="clazz ? clazz : 'fx-r'">
            <view class="px-s tiw">
                <text>{{ v.nickName }}</text>
                <view class="d-ib px-s">
                    <CkSex :sex="v.gender"/>
                </view>
            </view>
            <view class="w-2em h-2em fs-s br-s o-h">
                <CoImg clazz="h-100" :src="v.avatarUrl"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoImg from '@/components/media/img/CoImg.vue';

const prp = defineProps<{
    v: User,
    clazz?: string
}>()

</script>