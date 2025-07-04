<template>
    
</template>

<script setup lang="ts">
import { PAGE_WHITE_LIST } from '@/conf/conf-page';
import { authDispatch } from '@/memory/global';
import { AutoLoginStatus } from '@/memory/user/auth-store';
import uniRouter from '@/tool/uni/uni-router';
import router from '@/tool/uni/uni-router';
import { future } from '@/tool/util/future';
import { arrhas } from '@/tool/util/iodash';

const prp = defineProps<{
    enable: boolean
}>()


const func = {
    allow: () => future(async () => {
        if (!prp.enable) return undefined;
        
        // 页面实例
        const route: Page.PageInstance = router.info()
        const path: string | undefined = route.route

        // 判断是否在白名单
        if (arrhas(PAGE_WHITE_LIST, path)) {
            console.log('---- 该页面属于白名单内。')
        } 
        // 页面不在白名单内
        else {
            // 优先 自动登录
            const is_auto_login: AutoLoginStatus = await authDispatch('auto_login')

            // 未 自动登录
            if (is_auto_login === AutoLoginStatus.AUTO_FAIL) {
                uniRouter.redpg('login')
            }
        }
    })
}

func.allow()


/*
            // 判断当前用户权限是否在认证内
            if (ROLES_AUTHS.indexOf( role ) > -1) {
              
                // 在认证内，判断有没有登录
                if (authGetters.is_login) {
                    console.log('---- 用户已登录。')
                }
                // 没登录
                else {
                    // 跳转到登录页面
                    router.redpg('login')
                }
            } 
            // 当前用户权限不在认证内
            else {

                // 跳转到登录页面
                router.redpg('login')
            }
*/
</script>
