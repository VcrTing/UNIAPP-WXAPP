import { authDispatch, orderDispatch, soDispatch } from "@/memory/global";
import { prodDispatch } from "@/memory/moduies";
import { future, promise } from "@/tool/util/future";

// 用户登录成功后执行
export const for_user_loging = () => future(async () => {
    // 刷新用户主页
    soDispatch('refresh_mainpage')
    // orderDispatch('refresh_my_join')
    // 刷新用户购买了什么
    await prodDispatch('refresh_buys')
    
    // 刷新用户喜爱的标签
    await prodDispatch('refresh_prefer')
})

// 用户参加成功一个活动后
export const for_user_joing = () => promise(() => {
    // 查询用户报名表
    soDispatch('refresh_mainpage')
    // orderDispatch('refresh_my_join')
    prodDispatch('refresh_buys')
})