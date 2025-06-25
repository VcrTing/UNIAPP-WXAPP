

/**
 * master ====================================================================================================
 */

import { NET } from "./conf-net"

// 登录认证
const NET_ENDPOINT_AUTH = <ONE> {
    'login': 'app/auth/login' // 'sys/login'
}

// 用户
const NET_ENDPOINT_USER = <ONE>{
    'user': 'users',
    'love': 'user-loves',
    'statistic': 'user-statistics'
}
// 通用
const NET_ENDPOINT_COMMON = <ONE> {
    'tag': 'activity-tags',
    'media': 'activity-medias',
    'address': 'activity-addresses',
}

// 活动
const NET_ENDPOINT_ACTIVITY = <ONE> {
    'join': 'activity-registrations',
    'notice': 'activity-notices',
    'invite': 'activity-invites',
    'content': 'product-contents',
    'activity': 'activities',
}

export const NET_ENDPOINTS_MASTER = <ONE> {
    ...NET_ENDPOINT_AUTH,
    ...NET_ENDPOINT_USER,
    ...NET_ENDPOINT_COMMON,
    ...NET_ENDPOINT_ACTIVITY
}

export const NET_ENDPOINTS_BUSINESS = <ONE> {
    ...NET_ENDPOINT_AUTH,
    ...NET_ENDPOINT_USER,
    ...NET_ENDPOINT_COMMON,
    ...NET_ENDPOINT_ACTIVITY
}

export const NET_ENDPOINT_FILE = <ONE> {
    'upload': 'upload',
    'any': 'medias/upload/one'
}

export const __net_file_url = (k: string) => {
    const ink: string = NET_ENDPOINT_FILE[k]
    return NET.FILE.URI + '/' + NET.FILE.API + '/' + ink
}