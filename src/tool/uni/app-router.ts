import { pagePublishDispatch } from "@/memory/page"
import { future } from "../util/future"
import { storage } from "../web/storage"
import uniRouter from "./uni-router"
import { acyDispatch } from "@/memory/global"

export default {
    index: () => {
        uniRouter.navigatorpg('index')
    },
    // 订单支付成功
    order_succ: () => {
        storage.set('PAGE_PAYSUCC_KEY', 0)
        uniRouter.redpg('pay_succ')
    },
    // 选择女孩
    chose_girl: () => {
        storage.set('PAGE_CHOOSE_KEY', 1)
        uniRouter.gopg('choose')
    },
    // 选择标签
    chose_tags: () => {
        storage.set('PAGE_CHOOSE_KEY', 2)
        uniRouter.gopg('choose')
    },

    // 订单 - 我的加入
    order_my_join: () => {
        storage.set('PAGE_ORDER_KEY', 0)
        uniRouter.gopg('order')
    },
    // 订单 - 正在参与中
    order_my_working: () => {
        storage.set('PAGE_ORDER_KEY', 1)
        uniRouter.gopg('order')
    },
    // 订单 - 全部参与的
    order_my_history: () => {
        storage.set('PAGE_ORDER_KEY', 2)
        uniRouter.gopg('order')
    },

    // 消息页面
    msg_activity: () => {
        storage.set('PAGE_MSGINFO_KEY', 1)
        uniRouter.gopg('msginfo')
    },
    msg_yaoqing: () => {
        storage.set('PAGE_MSGINFO_KEY', 2)
        uniRouter.gopg('msginfo')
    },
    msg_gonggao: () => {
        storage.set('PAGE_MSGINFO_KEY', 3)
        uniRouter.gopg('msginfo')
    },
    msg_notify: () => {
        storage.set('PAGE_MSGINFO_KEY', 4)
        uniRouter.gopg('msginfo')
    },

    // 隐私政策
    security_ys: () => {
        storage.set('PAGE_SECURITY_KEY', 0)
        uniRouter.gopg('auth_security')
    },
    // 服务协议
    security_fwxy: () => {
        storage.set('PAGE_SECURITY_KEY', 1)
        uniRouter.gopg('auth_security')
    },

    // 编辑标签
    manager_tags: () => {
        storage.set('PAGE_MANAGER_KEY', 1)
        uniRouter.gopg('manager')
    },
    // 编辑地址
    manager_addr: () => {
        storage.set('PAGE_MANAGER_KEY', 2)
        uniRouter.gopg('manager')
    },
    // 我的收藏
    manager_love: () => {
        storage.set('PAGE_MANAGER_KEY', 3)
        uniRouter.gopg('manager')
    },
    // 支付记录
    manger_pays: () => {
        storage.set('PAGE_MANAGER_KEY', 4)
        uniRouter.gopg('manager')
    },

    // 跳转 publish waiting
    publish_waiting: () => future(async () => {
        storage.set('PAGE_PUBLISH_TAB_CODE', '1_0')
        await pagePublishDispatch('refresh')
        uniRouter.navigatorpg('publish')
    }),
    // 跳转到活动详情
    activity_detail: (v: Activity) => future(async () => {
        await acyDispatch('change', [ 'view', v ])
        uniRouter.gopg('activity_detail')
    })
}