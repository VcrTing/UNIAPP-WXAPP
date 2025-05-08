
export const PAGE_FOLDER_NAME = 'pages'

const index: string = 'pages/index/index'

export const PAGES: ONE = {
    index,
    'ui': 'pages/ui/ui/ui',
    'login': 'pages/auth/login/login',
    'login_succ': index,
    'user': 'pages/user/user',
    'form': 'pages/form/form',
    'report': 'pages/report/report',
    'sales_order': 'pages/business/report/sale/sales_order'
}

// 白名单 页面
export const PAGE_WHITE_LIST = [
    PAGES['login'],
    index
]

// UNIAPP NAVI BAR 页面
export const PAGE_NAVIGATION: string[] = [
    
]