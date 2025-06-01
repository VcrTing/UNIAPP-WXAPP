<template>
    <view class="fx-i">
        <CkAvatar v-if="v" :clazz="'w-2em h-2em fs-n'" :src="v.avatar"/>
        <view v-else class="w-2em h-2em fs-n"></view>
        <view class="fx-1 px">
            <view class="fs-w">
                <text>{{ v.name }}&nbsp;</text>
                <CkSex :sex="v.sex"/>
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
    v: ONE
}>()

</script>