

/**
 * master ====================================================================================================
 */

// 登录认证
const NET_ENDPOINT_AUTH = <ONE> {
    'login': 'app/auth/login' // 'sys/login'
}
// 测试用例
const NET_ENDPOINT_TEST = <ONE> {
    'timeout': 'zeng_test/timeout'
}
// 用户
const NET_ENDPOINT_USER_MASTER = <ONE>{
    'user_layout_menu': 'app/user/layout/menu'
}
// 报表
const NET_ENDPOINT_REPORT_MASTER = <ONE> {
    'report_schema': 'app/report/schema'
}

export const NET_ENDPOINTS_MASTER = <ONE> {
    ...NET_ENDPOINT_AUTH,
    ...NET_ENDPOINT_TEST,
    ...NET_ENDPOINT_USER_MASTER,
    ...NET_ENDPOINT_REPORT_MASTER
}

/**
 * company ====================================================================================================
 */

// 商业
const NET_ENDPOINT_BUSINESS = <ONE> {
    'report_table_msg': 'app/report/data/msg',
    'report_iist_first': 'app/report/data/first',
    'report_iist_cache': 'app/report/data/cache'
}

export const NET_ENDPOINTS_COMPANY = <ONE> {
    ...NET_ENDPOINT_BUSINESS
}