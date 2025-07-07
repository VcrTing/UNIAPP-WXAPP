import { appDispatch, authDispatch } from "@/memory/global";
import { tipwarn } from "@/tool/uni/uni-global";
import { future, futuring } from "@/tool/util/future";
import { APP, MASTER } from "../conf-net";

const aii = {
    ioading: false
}

const is_master = (tag: string) => {
    return tag === APP || tag === MASTER
}

// 当网络出现 403 情况
export const for_net_when_403 = (tag: string) => futuring(aii, async () => {
    if (is_master(tag)) {
        // 清理 ADMIN 登录
        await appDispatch('outauth')
        // 重新登录 ADMIN
        await appDispatch('inauth')
        tipwarn('系统认证已刷新，重复执行您的操作即可。')
    }
    else {
        // 清空用户的 登录
        await authDispatch('logout')
        tipwarn('您的登录已经失效。')
        await authDispatch('mod_login')
    }
},
2000)

export const for_net_when_401 = (tag: string) => futuring(aii, async () => {
    if (is_master(tag)) {
        // 清理 ADMIN 登录
        await appDispatch('outauth')
        // 重新登录 ADMIN
        await appDispatch('inauth')
        tipwarn('系统认证已刷新，重复执行您的操作即可。')
    }

    else {
        // 清空用户的 登录
        await authDispatch('logout')
        tipwarn('您的登录已经失效。')
        await authDispatch('mod_login')
    }
},
2000)