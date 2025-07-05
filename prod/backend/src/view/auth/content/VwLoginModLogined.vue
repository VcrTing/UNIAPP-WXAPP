<template>
    <view>
        <view v-if="auth && auth.user">
            <view class="pb pt-s">
                <view class="fx-c">
                    <CkAvatar clazz="w-6em h-6em" :id="auth.user.id" :src="auth.user.avatarUrl"/>
                </view>
            </view>
            <view class="pt">
                <OButton color="wht" clazz="">
                    <view class="fx-c mh-btn">
                        <text class="fw-700 h3 ls cos">
                            <text class="pr">
                                +{{ auth.phonedata.countryCode }}
                            </text>
                            <text>{{ auth.phonedata.phoneNumber }}</text>
                        </text>
                    </view>
                </OButton>
            </view>
        </view>
        <view class="pt-s"></view>
        <view class="fx-c px-row">
            <OButton color="pri-iht" clazz="btn-app" @tap="logout">
                <UiI i="a-i"/>
                <text class="pi-s">退出登录</text>
            </OButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authDispatch, authState } from '@/memory/global';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const auth = computed(() => authState.auth)

const logout = () => {
    authDispatch('logout')
    // pan_tooi.close_pan(loginhouse.value.pan_idx)
}
</script>