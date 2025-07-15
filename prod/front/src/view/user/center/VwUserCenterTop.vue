<template>
    <view>
        <view class="abs-r t-0 zi">
            <view @tap="funn.relogin" class="px-row py-row fx-aii-btn-wht-s br-cir fx-c">
                <OFI clazz="c-fff" i="r"/>
            </view>
        </view>
        <view v-if="ispad" :style="{
            height: 'calc(8vh + 1vw)'
        }"></view>
        <view v-else class="mh-app-top-bar"></view>
        <view class="fx-i px-row softer mxw-pc">
            <view class="fx-i">
                <view class="w-7em h-7em bd-x2 bd-c-wht-s br-cir o-h">
                    <CkAvatar @tap="funn.ck_avatar" :not_mainpage="true" :id="user.id"
                        :clazz="'w-100 h-100 ani-scaie-aii'" :src="user.avatarUrl || info.userDefAvatarUrl"/>
                </view>
                <view class="fx-1 pi c-fff">
                    <view @tap="funn.ck_name" class="h3 b pt pb-s px ani-scaie-aii">{{ user.nickName || '新用户' }}&nbsp;</view>
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
import OFI from '@/cake/button/i/OFI.vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { appState, authDispatch, authState, uiGetters } from '@/memory/global';
import auth_tool from '@/tool/modules/common/auth_tool';
import uniRouter from '@/tool/uni/uni-router';
import { computed } from 'vue';

const user = computed((): User => authState.user)

const funn = {
    ck_avatar: () => auth_tool.doac(async () => {
        uniRouter.gopg('user_info')
    }),
    ck_name: () => auth_tool.doac(async () => {
        // authDispatch('mod_login')
    }),
    relogin: () => authDispatch('mod_login')
}

const info = computed((): AppInfo => appState.info) 

const isphone = computed((): boolean => uiGetters.isphone)
const ispad = computed((): boolean => uiGetters.ispad)
const ispc = computed((): boolean => uiGetters.ispc)
</script>