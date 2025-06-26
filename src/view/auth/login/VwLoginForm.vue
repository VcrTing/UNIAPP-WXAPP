<template>
    <view class="w-100">
        <view class="bf bg-con px-x1 py-x2 br">
            <!--
            <OButton color="def" @tap="funn.login(0)" :clazz="'btn-app'">登录发起者</OButton>
            -->
            <view>
                <input v-model="aii.phone" class="inp-app btn-def br-rnd" placeholder="仅需输入手机号"/>
            </view>
            <view class="py-n"></view>
            <OButton @tap="emt('submit')" :clazz="'btn-app'">登录/注册</OButton>
            <view class="pt-s"></view>
            <view class="pt">
                <view class="fx-c fs-s tis">
					<radio class="" :value="'true'" :checked="me.agree" />
                    <view>
                        <text>已同意并阅读</text>
                        <text class="pri" @tap="appRouter.security_fwxy">《{{ APP_GENERATE_DETAIL.name }}服务协议》</text>
                        <text class="pri" @tap="appRouter.security_ys">《隐私政策》</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import { authDispatch } from '@/memory/global';
import mock_user from '@/server/mock/user/mock_user';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { reactive } from 'vue';

const prp = defineProps<{ aii: ONE }>()

const me = reactive({
    agree: 'true'
})

const emt = defineEmits([ 'submit' ])

const funn = {
    login: (i: number) => {
        authDispatch('login', (i == 1) ? mock_user.boy : mock_user.girl)
        // 
        if (i == 0) {
            uniRouter.gopg('auth_intor')
        }
        else {
            uniRouter.navigatorpg('user')
        }
    }
}

</script>