<template>
    <view>
        <view v-if="ispad" :style="{
            height: 'calc(2vh)'
        }">
        </view>
        <view class="fx-c">
            <view class="ta-c">
                
                <CkAvatar :not_mainpage="true" :id="user.id"
                    :src="user.avatarUrl || info.userDefAvatarUrl" clazz="w-6em h-6em h7 bd-x2 bd-c-wht-s br-cir o-h"
                    />
                <view class="pt-x1">
                    <view class="h5 c-fff fw-800 ls">
                        <text class="pr-s">&nbsp;</text>
                        <text>{{ user.nickName }}</text>
                        <view class="d-ib pi-s">
                            <CkSex :sex="user.gender" :bg="true"/>
                        </view>
                    </view>
                </view>
                <view class="pt-x1" v-if="user.introduction">
                    <view class="fs-w c-fff op-80">
                        <text>个人简介:&nbsp;</text>
                        <text>{{ user.introduction || '' }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import { appState, uiGetters } from '@/memory/global';
import { computed } from 'vue';

const prp = defineProps<{
    user: User
}>()

const info = computed((): AppInfo => appState.info) 

const isphone = computed((): boolean => uiGetters.isphone)
const ispad = computed((): boolean => uiGetters.ispad)

</script>