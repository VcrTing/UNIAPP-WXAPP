import { authGetters, authState } from "@/memory/global"
import { IS_NET_LOG, is_strapi_mode, IS_TEST_MODE } from "./conf"
import { NET_ENDPOINT_FILE, NET_ENDPOINTS_MASTER } from "./conf-endpoints"


// 数据来源
export const MASTER: string = 'MASTER'
// 数据来源
export const FILE: string = 'FILE'

// 全局配置
export const NET = {
    MASTER: {
        URI: is_strapi_mode() ? 'http://localhost:1337' : '',
        API: is_strapi_mode() ? 'api' : 'api',
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true
    },
    FILE: {
        URI: is_strapi_mode() ? 'http://localhost:1337' : '',
        API: is_strapi_mode() ? 'api' : 'api',
        TIMEOUT_GET: 1000 * 30,
        TIMEOUT_POS: 1000 * 30,
        IS_LOG: true
    }
}

/*
// 全局 主响应 URI
export const NET_URI_MASTER = is_strapi_mode() ? 'http://localhost:1337' : ''

// 全局 主响应 的 API
export const NET_URI_MASTER_API = is_strapi_mode() ? 'api' : 'api'

// GET 超时时间
export const NET_TIMEOUT_GET = 1000 * 30
// POST 超时时间
export const NET_TIMEOUT_POS = 1000 * 30
*/

// 打印 网络连接
export const NET_IS_LOG = IS_NET_LOG

// 获取 JWT 的方法，从 authStore 里面拿 jwt
export const NET_FUNCTION_GET_JWT = (): string => {
    NET_IS_LOG ? console.log('请求的 JWT =', authGetters.jwt) : undefined;
    return authGetters.jwt;
}


/**
 * 网络 LINK 合集 ====================================================================================================
 */
// 网站的 endpoint，key 名字和 上面的要对应
export const NET_ENDPOINTS = <ONEO>{
    'MASTER': NET_ENDPOINTS_MASTER,
    'FILE': NET_ENDPOINT_FILE
}

/**
 * 网络错误信息 ====================================================================================================
 */
export const NET_ERRORS_TXT = <ONE>{
    'request:fail': '网络波动 / 本次未检测到服务器。',
    'request:fail timeout': '网络超时，请重试。',

    'Internal Server Error': '接口请求出错，请联络管理员。现在这个情况一般是登录失效了'
}