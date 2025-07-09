

/**
 * master ====================================================================================================
 */

import { NET } from "./conf-net"

// 用户
const NET_ENDPOINT_USER = <ONE>{
    'user': 'users',
    'love': 'user-loves',
    'statistic': 'user-statistics'
}
// 通用
const NET_ENDPOINT_COMMON = <ONE> {
    'tag': 'tags',
    'prefer': 'tag-visuals',
    'media': 'product-medias',
}

// 活动
const NET_ENDPOINT_ACTIVITY = <ONE> {
    AUTH: {
        'content': 'product-contents',
        'activity': 'activities'
    },
    ANON: {
        'activity': 'activities'
    }
}
const NET_ENDPOINT_PRODUCT = <ONE> {
    AUTH: {
        'product': 'products'
    },
    ANON: {
        'product': 'products',
        'visual': 'product-visuals'
    }
}

// 登录后才能查看的系统消息
const NET_ENDPOINT_SYSTEM = <ONE> {
    'msg': 'msg-systems'
}

/*
-------------------------------------------------------------------
*/

// APP, 无需 TOKEN 的 strapi
export const NET_ENDPOINTS_APP = <ONE>{
    ...NET_ENDPOINT_USER,
    ...NET_ENDPOINT_COMMON,
    'app-info': 'app-infos',
    'login': 'auth/local',
    ...NET_ENDPOINT_PRODUCT.ANON,
    ...NET_ENDPOINT_ACTIVITY.ANON,
}
// MASTER 需要 TOKEN 才能访问
export const NET_ENDPOINTS_MASTER = <ONE> {
    'user': 'users',
    ...NET_ENDPOINT_SYSTEM,
    ...NET_ENDPOINT_PRODUCT.AUTH,
    ...NET_ENDPOINT_ACTIVITY.AUTH,
}
// BUSINESS
export const NET_ENDPOINTS_BUSINESS = <ONE> {
    'login': 'auth/login',
    'checkout': 'order/checkout',
    'order': 'orders',
    'order-product': 'orders/products'
}

export const NET_ENDPOINT_FILE = <ONE> {
    'upload': 'upload',
    'any': 'medias/upload/one'
}

export const __net_file_url = (k: string) => {
    const ink: string = NET_ENDPOINT_FILE[k]
    return NET.FILE.URI + '/' + NET.FILE.API + '/' + ink
}