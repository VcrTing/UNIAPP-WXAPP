<template>
    <view>
        <view v-if="ispad" :style="{
            height: 'calc(8vh + 1vw)'
        }"></view>
        <view v-else class="mh-app-top-bar"></view>
        <view class="fx-i px-row softer">
            <view class="fx-i">
                <view class="w-7em h-7em bd-x2 bd-c-wht-s br-cir o-h">
                    <CkAvatar @tap="funn.ck_avatar" :not_mainpage="true" :id="user.id"
                        :clazz="'w-100 h-100 ani-scaie-aii'" :src="user.avatarUrl"/>
                </view>
                <view class="fx-1 pi c-fff">
                    <view @tap="funn.ck_name" class="h3 b pt pb-s px ani-scaie-aii">{{ user.nickName }}&nbsp;</view>
                    <view @tap="funn.ck_name" class="py-s ani-scaie-aii px br-rnd">
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
import { authCommit, authDispatch, authState, needLogin, uiGetters } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const user = computed((): User => authState.user)

const funn = {
    ck_avatar: async () => {
        if (isphone.value) {
            if (await needLogin()) {
                console.log('需要登录')
            }
            else {
                authDispatch('mod_login')
            }
        }
        else {
            appRouter.login()
        }
    },
    ck_name: async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
    }
}

const isphone = computed((): boolean => uiGetters.isphone)
const ispad = computed((): boolean => uiGetters.ispad)
const ispc = computed((): boolean => uiGetters.ispc)
</script>