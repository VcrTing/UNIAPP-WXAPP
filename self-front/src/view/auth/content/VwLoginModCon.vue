<template>
    <view class="w-100 ">
        <view class="px-row py-row abs-i t-0 zi-s" @tap="emt('back')">
            <view class="pri">
                <UiI i="a-i" clazz="d-ib"/>
                <text class="pi-s">返回</text>
            </view>
        </view>
        <view class="">
            <view class="pb pt-s">
                <view class="fx-c">
                    <CkAvatar clazz="w-6em h-6em" :id="user.id" :src="user.avatarUrl"/>
                </view>
            </view>
            <view class="pt">
                <OButton color="wht" clazz="">
                    <view class="fx-c mh-btn">
                        <text class="fw-700 h3 ls cos">
                            <text class="pr">
                                +{{ phonedata.countryCode }}
                            </text>
                            <text>{{ phonedata.phoneNumber }}</text>
                        </text>
                    </view>
                </OButton>
            </view>
            <view class="pt-s"></view>
            <OButton @tap="funn.login(1)" :ioading="aii.ioading"
                :clazz="'h-5vh fw-550 ls-x2'">
                立即登录
            </OButton>
            <view class="pt-s"></view>
            <view class="py abs-b w-100 bg-con">
                <view class="fx-c fs-s tis">
					<radio class="" :value="'true'" :checked="aii.agree" />
                    <view>
                        <text>已同意并阅读</text>
                        <text class="pri" @tap="appRouter.security_fwxy">《{{ info.name }}服务协议》</text>
                        <text class="pri" @tap="appRouter.security_ys">《隐私政策》</text>
                    </view>
                </view>
                <OSafeAreaBottom/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { appState, authDispatch, authState } from '@/memory/global';
import server_auth from '@/server/auth/server_auth';
import appRouter from '@/tool/uni/app-router';
import { tipwarn } from '@/tool/uni/uni-global';
import { futuring } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    user: User
}>()

const aii = reactive({
    agree: 'true', ioading: false
})

const phonedata = computed((): AppPhoneWX => {
    return authState.phonedata
})

const emt = defineEmits([ 'back' ])

const funn = {
    login: (i: number) => futuring(aii, async () => {
        const p: string = phonedata.value.phoneNumber
        if (p) {
            const auth: AppAuth | null = await server_auth.login(phonedata.value)
            authDispatch('login', auth)
        }
        else {
            tipwarn('未获取到电话号码。')
        }
    })
}

const info = computed((): AppInfo => appState.info) 
</script>