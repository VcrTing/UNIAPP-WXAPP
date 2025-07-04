import { appGetters, authGetters } from "@/memory/global"
import { IS_NET_LOG, is_strapi_mode } from "./conf"
import { NET_ENDPOINT_FILE, NET_ENDPOINTS_APP, NET_ENDPOINTS_BUSINESS, NET_ENDPOINTS_MASTER } from "./conf-endpoints"

// 1. 用户 role 要设置对，
// 2. role 的权限要设置对
// 3. 接口要开放 token 访问。
// 4. 用户不能是 blocked = true
export const NET_BASIC_YOU = {
    saak: 'vcrting@163.com', // 'vcrting@163.com',
    spec: 'qiong123456'
}


// 数据来源
export const APP: string = 'APP'
// 数据来源
export const MASTER: string = 'MASTER'
// 数据来源
export const BUSINESS: string = 'BUSINESS'
// 数据来源
export const FILE: string = 'FILE'

const IS_DEV_MODE = true

const __API_NAME_STRAPI = 'api'
const __API_NAME_BACKEND = 'backend'

const __LINK_STRAPI = IS_DEV_MODE ? 'http://localhost:1338' : ''
const __LINK_BACKEND = IS_DEV_MODE ? 'http://localhost:8889' : ''

// 全局配置
export const NET = {
    // 负责 应用、不使用 TOKEN 的东西，
    APP: {
        URI: __LINK_STRAPI,
        API: __API_NAME_STRAPI,
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => { return ''; }
    },
    // 负责 商品、活动、标签
    MASTER: {
        URI: __LINK_STRAPI,
        API: __API_NAME_STRAPI,
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => { return appGetters.jwt; }
    },
    // 负责 用户、订单
    BUSINESS: {
        URI: __LINK_BACKEND,
        API: __API_NAME_BACKEND,
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => {
            NET_IS_LOG ? console.log('BUSINESS 请求的 JWT =', authGetters.jwt) : undefined;
            return authGetters.jwt;
        }
    },
    // 负责 媒体
    FILE: {
        URI: __LINK_BACKEND,
        API: __API_NAME_BACKEND,
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => {
            // NET_IS_LOG ? console.log('FILE 请求的 JWT =', authGetters.jwt) : undefined;
            return authGetters.jwt;
        }
    }
}

// 打印 网络连接
export const NET_IS_LOG = IS_NET_LOG

/**
 * 网络 LINK 合集 ====================================================================================================
 */
// 网站的 endpoint，key 名字和 上面的要对应
export const NET_ENDPOINTS = <ONEO>{
    'APP': NET_ENDPOINTS_APP,
    'MASTER': NET_ENDPOINTS_MASTER,
    'FILE': NET_ENDPOINT_FILE,
    'BUSINESS': NET_ENDPOINTS_BUSINESS
}

/**
 * 网络错误信息 ====================================================================================================
 */
export const NET_ERRORS_TXT = <ONE>{
    'request:fail': '网络波动 / 本次未检测到服务器。',
    'request:fail timeout': '网络超时，请重试。',

    'Internal Server Error': '接口请求出错，请联络管理员。现在这个情况一般是登录失效了'
}