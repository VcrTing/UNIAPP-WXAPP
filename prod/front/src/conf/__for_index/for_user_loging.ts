import { authDispatch, orderDispatch, soDispatch } from "@/memory/global";
import { prodDispatch } from "@/memory/moduies";
import { pageCartDispatch, pagePublishDispatch } from "@/memory/page";
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

    // 驱动页面刷新
    pageCartDispatch('refresh')
    orderDispatch('refresh')
    pagePublishDispatch('refresh')

    console.log('---------------- 切换登录？-------------------')
})

// 用户参加成功一个活动后
/*
export const for_user_joing = () => promise(() => {
    // 查询用户报名表
    soDispatch('refresh_mainpage')
    // orderDispatch('refresh_my_join')
    prodDispatch('refresh_buys')
})
*/
export const for_switch_login = () => promise(() => {
    pageCartDispatch('refresh')
    orderDispatch('refresh')
    pagePublishDispatch('refresh')
    // prodDispatch('refresh')
})

export const for_user_buyed = () => promise(() => {
    //
    console.log('刷新首页数据')
    console.log('刷新订单页面')
    console.log('刷新购物车页面')
    
})