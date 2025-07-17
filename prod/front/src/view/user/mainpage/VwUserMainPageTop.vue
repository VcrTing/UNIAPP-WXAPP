<template>
    <view>
        <view v-if="ispad" :style="{
            height: 'calc(11.6vh)'
        }">
        </view>
        <view class="fx-c">
            <view class="ta-c">
                
                <CkAvatar :not_mainpage="true" :id="user.id"
                    :src="user.avatarUrl || info.userDefAvatarUrl" 
                    :clazz="(ispad ? 'w-8em h-8em ' : 'w-6em h-6em ') + ' h7 bd-x2 bd-c-wht-s br-cir o-h'"
                    />
                <view class="pt-x1">
                    <view class="h5 c-fff fw-800 ls">
                        <view class="bf d-ib br-s px-t">
                            <text>{{ user.nickName }}</text>
                        </view>
                        <!--
                        <view class="d-ib pi-s">
                            <CkSex :sex="user.gender" :bg="true"/>
                        </view>
                        -->
                    </view>
                </view>
                <view>
                    <view class="py fx-c">
                        <OButton color="wht-s" :weak="true" clazz="br-t ani-scaie-aii tid">
                            <CkSex :sex="user.gender" />
                            <text>&nbsp;</text>
                            <text class="fs-n">{{ user_tool.getgender(user) }}</text>
                        </OButton>
                        <view class="d-ib px-n"></view>
                        <OButton color="wht-s" :weak="true" clazz="br-t ani-scaie-aii tid">
                            <text>{{ user.age || 18 }}</text>
                            <text>&nbsp;</text>
                            <text class="fs-n">岁</text>
                        </OButton>
                        <view class="d-ib px-n" v-if="user.city"></view>
                        <view class="d-ib" v-if="user.city">
                            <OButton color="wht-s" :weak="true" clazz="br-t ani-scaie-aii tid">
                                <UiI clazz="fs-s" i="addr"/>
                                <text>&nbsp;</text>
                                <text class="fs-s">{{ user.city || '未知城市' }}</text>
                            </OButton>
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
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import { appState, uiGetters } from '@/memory/global';
import user_tool from '@/tool/modules/user_tool';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    user: User
}>()
const info = computed((): AppInfo => appState.info) 

const ispad = computed((): boolean => uiGetters.ispad)
const isphone = computed((): boolean => uiGetters.isphone)

</script>