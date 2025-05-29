<template>
    <view class="fx-i">
        <view :class="clazz">
            <CkAvatar v-if="v" :clazz="'w-3em h-3em'" :src="v.avatar"/>
            <view v-else class="w-3em h-3em"></view>
        </view>
        <view class="fx-1 px">
            <view class="">
                {{ v.name }}
                <CkSex :sex="v.sex"/>
            </view>
            <view class="fx-s">
                <view class="pt-t fs-n">
                    {{ v.age || 18 }} 岁
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
import CkSex from '@/cake/visual/ider/CkSex.vue';

defineProps<{
    v: ONE,
    clazz?: string
}>()

</script>