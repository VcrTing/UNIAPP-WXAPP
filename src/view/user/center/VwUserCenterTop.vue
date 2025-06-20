<template>
    <view>
        <view class="mh-app-top-bar"></view>
        <view class="fx-i px-row softer">
            <view class="fx-i">
                <view class="w-7em h-7em bd-x2 bd-c-wht-s br-cir o-h">
                    <CkAvatar @tap="funn.ck_avatar" :not_mainpage="true" :id="user.id"
                        :clazz="'w-100 h-100 ani-scaie-aii'" :src="user.avatarUrl"/>
                </view>
                <view class="fx-1 pi-x2 c-fff">
                    <view @tap="funn.ck_name" class="h5 b pt-n">{{ user.nickName }}&nbsp;</view>
                    <view @tap="funn.ck_name" class="pt">
                        <text v-if="user.introduction">{{ user.introduction }}</text>
                        <text v-else>这个用户还没有个人简介。</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authCommit, authDispatch, authState, needLogin } from '@/memory/global';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const user = computed((): User => authState.user)

const funn = {
    ck_avatar: async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
        else {
            authDispatch('mod_login')
        }
    },
    ck_name: async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
    }
}
</script>