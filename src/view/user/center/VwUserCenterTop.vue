<template>
    <view>
        <view class="py-x3"></view>
        <view class="py-x1"></view>
        <view class="fx-i px-row">
            <view class="fx-i">
                <view >
                    <CkAvatar @tap="uniRouter.goui()" 
                        :clazz="'w-7em h-7em'" :src="user.avatar"/>
                </view>
                <view class="fx-1 pi-x2 c-fff">
                    <view class="h5 b pt-s">{{ user.username }}</view>
                    <view class="pt-s">
                        社交账号: 2782721850
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const user = computed(() => authState.user)
</script>