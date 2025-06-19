<template>
    <view class="fx-i" :class="clazz">
        <view>
            <CkAvatar v-if="v" :clazz="'w-3em h-3em h7'" :id="v.id" :src="v.avatar"/>
            <view v-else class="w-3em h-3em h7"></view>
        </view>
        <view class="fx-1 px">
            <view class="">
                {{ v.name }}
                <CkSex :sex="v.sex"/>
            </view>
            <view class="fx-s">
                <slot name="b"></slot>
            </view>
        </view>
        <view>
            <slot name="r"></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

defineProps<{
    v: ONE,
    clazz?: string
}>()

</script>