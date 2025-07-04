import { appDispatch, authDispatch } from "@/memory/global";
import { future, futuring } from "@/tool/util/future";

const aii = {
    ioading: false
}

// 当网络出现 403 情况
export const for_net_when_403 = () => futuring(aii, async () => {
    // 清理 ADMIN 登录
    await appDispatch('outauth')

    // 重新登录 ADMIN
    await appDispatch('inauth')

    // 清空用户的 登录
    await authDispatch('logout')
},
2000)