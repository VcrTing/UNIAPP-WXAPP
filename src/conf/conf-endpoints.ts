

/**
 * master ====================================================================================================
 */

import { NET } from "./conf-net"

// 登录认证
const NET_ENDPOINT_AUTH = <ONE> {
    'login': 'app/auth/login' // 'sys/login'
}
// 测试用例
const NET_ENDPOINT_TEST = <ONE> {
    'timeout': 'zeng_test/timeout'
}
// 用户
const NET_ENDPOINT_USER = <ONE>{
    'user': 'users'
}
// 活动
const NET_ENDPOINT_ACTIVITY = <ONE> {
    'activity': 'activities',
    'activity-tags': 'activity-tags',
    'activity-media': 'activity-medias',
    'activity-address': 'activity-addresses',
}

export const NET_ENDPOINTS_MASTER = <ONE> {
    ...NET_ENDPOINT_AUTH,
    ...NET_ENDPOINT_TEST,
    ...NET_ENDPOINT_USER,
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