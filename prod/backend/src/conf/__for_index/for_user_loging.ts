import { authDispatch, orderDispatch } from "@/memory/global";
import { prodDispatch } from "@/memory/moduies";
import { pageIndexDispatch } from "@/memory/page";
import { promise, timeout } from "@/tool/util/future";

// 用户登录成功后执行
export const for_user_loging = () => promise(() => {
    // 查询用户报名表
    authDispatch('refresh_mainpage')
    // orderDispatch('refresh_my_join')
    prodDispatch('refresh_buys')

})

// 用户参加成功一个活动后
export const for_user_joing = () => promise(() => {
    // 查询用户报名表
    authDispatch('refresh_mainpage')
    // orderDispatch('refresh_my_join')
    prodDispatch('refresh_buys')
})