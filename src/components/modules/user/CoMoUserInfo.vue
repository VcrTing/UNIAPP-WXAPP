<template>
    <view class="fx-i">
        <view>
            <CkAvatar v-if="v" :clazz="'w-3em h-3em'" :src="v.avatar"/>
            <view v-else class="w-3em h-3em"></view>
        </view>
        <view class="fx-1 pi">
            <view class="">
                {{ v.name }}
                <view class="d-ib">♀</view>
            </view>
            <view class="fx-s">
                <view class="pt-t fs-n">
                    {{ v.age || 18 }} 岁
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';

defineProps<{
    v: ONE
}>()

</script>