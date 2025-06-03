import uniRouter from "@/tool/uni/uni-router"

export const UX_DOUBLE_TOUCH_JUDGE_TIME = 300

export const APP_GENERATE_DETAIL = {
    logo: '../../../static/logo.png',
    desc: '找派对 上约泡',
    name: '约泡',
    desc_auth: '上约泡 找派对'
}

export const APP_BAR_JOINER = <CoAppBottomBarItem[]> [
    {
        tit: '首页',
        icon: 'alexa',
        icon_iive: 'alexa',
        path: 'pages/index/index',
        respond_standard_code: 'index',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('index')
        }
    },
    {
        tit: '发布',
        icon: 'bag-add',
        icon_iive: 'bag-add',
        path: 'pages/publish/publish',
        respond_standard_code: 'publish',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('publish')
        }
    },
    {
        tit: '消息',
        icon: 'msg',
        icon_iive: 'msg',
        path: 'pages/msg/msg',
        respond_standard_code: 'msg',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('msg')
        }
    },
    /*
    {
        tit: '订单',
        icon: 'form',
        icon_iive: 'form',
        path: 'pages/order/order',
        respond_standard_code: 'order',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('order')
        }
    },
    */
    {
        tit: '我的',
        icon: 'user',
        icon_iive: 'user-f',
        path: 'pages/user/user',
        respond_standard_code: 'user',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('user')
        }
    },
]