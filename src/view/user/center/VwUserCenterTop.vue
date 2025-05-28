<template>
    <view>
        <view class="py-x3"></view>
        <view class="py-x2"></view>
        <view class="fx-i px-row">
            <view class="fx-i">
                <view >
                    <CkAvatar @tap="funn.ck_avatar" :not_mainpage="true"
                        :clazz="'w-7em h-7em'" :src="user.avatar"/>
                </view>
                <view class="fx-1 pi-x2 c-fff">
                    <view @tap="funn.ck_name" class="h5 b pt-s">{{ user.nickname }}</view>
                    <view @tap="funn.ck_name" class="pt-s">
                        社交账号:&nbsp;{{ user.socialAccount }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authCommit, authState, needLogin } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const user = computed(() => authState.user)

const funn = {
    ck_avatar: async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
    },
    ck_name: async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
    }
}
</script>