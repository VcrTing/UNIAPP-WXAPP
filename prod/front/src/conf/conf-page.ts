
export const PAGE_FOLDER_NAME = 'pages'

const index: string = 'pages/index/index'

export const PAGES: ONE = {
    index,
    'ui': 'pages/ui/ui/ui',
    'login': 'pages/auth/login/login',
    'login_succ': index,
    'user': 'pages/user/user',
    'msg': 'pages/msg/msg',
    'order': 'pages/order/order',
    'publish': 'pages/publish/publish',
    'interaction': 'pages/interact/interaction',
    'user_info': 'pages/user/info/UserInfo',
    'user_gallery': 'pages/user/media/UserGallery',
    'auth_intor': 'pages/auth/intor/AuthIntor',
    'index_search': 'pages/index/search/IndexSearch',
    'publish_plus': 'pages/publish/plus/PublishPlus',
    'publish_edit': 'pages/publish/plus/PublishEdit',
    'user_mainpage': 'pages/user/mainpage/UserMainPage',
    'order_working': 'pages/order/working/OrderWorking',
    //
    'activity_order': 'pages/activity/order/ActivityOrder',
    'activity_detail': 'pages/activity/detail/ActivityDetail',
    'interaction_plus': 'pages/interact/plus/InteractionPlus',
    'interaction_detail': 'pages/interact/detail/InteractionDetail',
    //
    'msginfo': 'pages/common/msginfo/MsgInfo',
    'choose': 'pages/common/choose/AnyChoose',
    'manager': 'pages/common/manager/UserManager',
    'pay_succ': 'pages/common/success/PaymentSuccess',
    'auth_security': 'pages/common/security/AuthSecurity',
    //
    'product_detail': 'pages/product/detail/ProductDetail',

    'cart': 'pages/cart/cart',
    'order_ready': 'pages/order/ready/OrderReady'
}

// 白名单 页面
export const PAGE_WHITE_LIST = [
    PAGES['login'],
    index
]

// UNIAPP NAVI BAR 页面
export const PAGE_NAVIGATION: string[] = [
    'index', 'user', 'order', 'cart', 'publish'
]

// 
