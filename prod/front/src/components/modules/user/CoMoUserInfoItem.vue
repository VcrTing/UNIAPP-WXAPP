<template>
    <view class="fx-i" :class="clazz">
        <view>
            <CkAvatar v-if="v" :clazz="'w-3em h-3em'" :id="v.id" :src="v.avatarUrl"/>
            <view v-else class="w-3em h-3em"></view>
        </view>
        <view class="fx-1 px" v-if="v.id">
            <view>
                <view class="">
                    {{ v.nickName }}
                    <CkSex :sex="v.gender"/>
                </view>
                <view class="fx-s">
                    <slot name="b"></slot>
                </view>
            </view>
        </view>
        <view v-else class="fx-1"></view>
        <view>
            <slot name="r"></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

defineProps<{
    v: User,
    clazz?: string
}>()

</script>