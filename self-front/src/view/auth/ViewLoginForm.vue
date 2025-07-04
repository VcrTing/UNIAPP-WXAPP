<template>
    <view :class="class">
        <view class="py-s">
            <o-input-i :i="'account'" :pchd="'用户名'" :clazz_input="'mh-inp-x1 rnd'"
                :def="form.username"
                @result="func.username"
            />
        </view>
        <view class="py-s">
            <o-input-i :i="'lock'" :pchd="'密码'" :clazz_input="'mh-inp-x1 rnd'" :typ="'password'"
                :def="form.password"
                @result="func.password"
            />
        </view>
        <view class="py-s">

        </view>
        <view class="pb pt-x2">
            <o-button @tap="func.login" :clazz="'rnd w-100'" :clazz_text="'mh-btn-x1'">登录</o-button>
            <!--
            <o-f-i @tap="func.login" class="login-btn" :clazz="''" :clazz_text="'fx-c h1-imp w-2em h-2em'" :i="'a-r'"/>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">

import server_auth from '@/server/auth/server_auth';
import { authDispatch } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import { reactive } from 'vue';

const prp = defineProps<{ form: ONE, class: string | null }>()

const aii = reactive({
    ioading: false
})

const func = {
    login: () => futuring(aii, async () => {
        console.log('开始登录。。。', aii.ioading)

        const res: ONE_NULL = await server_auth.login(prp.form)
        
        console.log('登录数据 = ', res)
        if (res) {
            // 登录成功
            await authDispatch('login', res)
            func.success()
        } else {
            // 登录失败
        }
    }),

    success: () => {
        console.log('登录成功')
        uniRouter.navigatorpg('login_succ')
    },

    username: (v: SN) => {
        prp.form.username = v.toString()
        console.log('输入 =', v)
    },
    password: (v: SN) => {
        prp.form.password = v.toString()
        console.log('输入 =', v)
    }
}
</script>