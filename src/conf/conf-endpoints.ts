

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
    'tag': 'activity-tags',
    'media': 'activity-medias',
}

// 活动
const NET_ENDPOINT_ACTIVITY = <ONE> {
    'content': 'product-contents',
    'join': 'activity-registrations',
    'address': 'activity-addresses',
    'invite': 'activity-invites',
    'notice': 'activity-notices',
    'activity': 'activities', // 活动的编辑
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
    'activity': 'activities', // 活动的查询
}
// MASTER 需要 TOKEN 才能访问
export const NET_ENDPOINTS_MASTER = <ONE> {
    ...NET_ENDPOINT_ACTIVITY,
}
// BUSINESS
export const NET_ENDPOINTS_BUSINESS = <ONE> {
    'login': 'auth/login'
}

export const NET_ENDPOINT_FILE = <ONE> {
    'upload': 'upload',
    'any': 'medias/upload/one'
}

export const __net_file_url = (k: string) => {
    const ink: string = NET_ENDPOINT_FILE[k]
    return NET.FILE.URI + '/' + NET.FILE.API + '/' + ink
}