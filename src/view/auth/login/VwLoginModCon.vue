<template>
    <view class="w-100">
        <view class="">
            <view class="py">
                <view class="fx-c">
                    <CkAvatar clazz="w-6em h-6em" :src="user.avatar"/>
                </view>
            </view>
            <view class="pt">
                <OButtonWht clazz="w-100">
                    <view class="h-5vh fx-c">
                        <text class="fw-700 h3 ls tis">
                            <text>
                                +86
                            </text>
                            <text>13576639986</text>
                        </text>
                    </view>
                </OButtonWht>
            </view>
            <view class="py-s"></view>
            <OButton @tap="funn.login(1)" :ioading="aii.ioading"
                :clazz="'h-5vh fw-550 ls-x2'">立即登录</OButton>
            <view class="pt-s"></view>
            <view class="py abs-b w-100 bg-con">
                <view class="fx-c fs-s tis">
					<radio class="" :value="'true'" :checked="aii.agree" />
                    <view>
                        <text>已同意并阅读</text>
                        <text class="pri" @tap="funn.look(1)">《{{ APP_GENERATE_DETAIL.name }}服务协议》</text>
                        <text class="pri" @tap="funn.look(0)">《隐私政策》</text>
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
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import { authDispatch, authState } from '@/memory/global';
import mock_user from '@/server/mock/user/mock_user';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    agree: 'true', ioading: false
})

const user = computed(() => authState.user)

const funn = {
    look: (i: number) => {
        if (i == 1) {
            storage.set('PAGE_SECURITY_KEY', 1)
        }
        else if (i == 0) {
            storage.set('PAGE_SECURITY_KEY', 0)
        }
        uniRouter.gopg('auth_security')
    },
    login: (i: number) => {
        aii.ioading = true
        setTimeout(() => {
            authDispatch('login', (i == 1) ? mock_user.boy : mock_user.girl);
            aii.ioading = false
        }, 3000)
        
        /*
        if (i == 0) {
            uniRouter.gopg('auth_intor')
        }
        else {
            uniRouter.navigatorpg('user')
        }
        */
        
    }
}

</script>