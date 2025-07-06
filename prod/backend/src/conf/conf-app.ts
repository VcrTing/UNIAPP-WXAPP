import { pageIndexDispatch } from "@/memory/page"
import pan_tooi from "@/tool/app/pan_tooi"
import appRouter from "@/tool/uni/app-router"
import uniRouter from "@/tool/uni/uni-router"

export const UX_DOUBLE_TOUCH_JUDGE_TIME = 300

export const APP_GENERATE_DETAIL = <AppInfo>{
    logo: 'https://img2.baidu.com/it/u=1882819932,1177030922&fm=253&fmt=auto&app=120&f=JPEG?w=655&h=655',
    desc: '找派对 上同趣圈',
    name: '同趣圈',
    logoLogin: 'https://img1.baidu.com/it/u=1178382764,329077325&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    descLogin: '上同趣圈 找派对',
    bgLogin: 'https://pic.rmb.bdstatic.com/bjh/down/VO71yj0jXIpiVpiH4RncQwcdb339b9cbdc38e7d07ffb138c8269f9.jpg?for=bg',
    userDefAvatarUrl: 'https://img2.baidu.com/it/u=1985709170,3830724062&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    userDefBackground: 'https://wx3.sinaimg.cn/mw690/008x0tqcgy1i1wlvuoyxcj30u01swanp.jpg',
    index_banners: [
        <Media>{ url: '' }
    ]
}

export const app_confirm = () => pan_tooi.open_def_b(1001, { opacity: 0.4 })

export const APP_BAR_JOINER = <CoAppBottomBarItem[]> [
    {
        tit: '审核',
        icon: 'alexa',
        icon_iive: 'alexa',
        path: 'pages/index/index',
        respond_standard_code: 'index',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            uniRouter.navigatorpg('index')
            pageIndexDispatch('refresh')
        }
    },
    /*
    {
        tit: '购物车',
        icon: 'cart',
        icon_iive: 'cart',
        path: 'pages/cart/cart',
        respond_standard_code: 'cart',
        clazz_die: '',
        clazz_iive: 'app-bottom-bar-item-iive',
        func: () => {
            appRouter.cart()
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
    /*
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