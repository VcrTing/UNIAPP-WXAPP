
export const PAGE_FOLDER_NAME = 'pages_backend'

const index: string = PAGE_FOLDER_NAME + '/index/index'

export const PAGES: ONE = {
    index,
    'user': PAGE_FOLDER_NAME + '/user/user',
    'order': PAGE_FOLDER_NAME + '/order/order',
    'product_detail': PAGE_FOLDER_NAME + '/product/detail/ProductDetail',
}

// 白名单 页面
export const PAGE_WHITE_LIST = [
    PAGES['login'],
    index
]

// UNIAPP NAVI BAR 页面
export const PAGE_NAVIGATION: string[] = [
    
]

// 
