
// 是否 打开 网络请求的 打印
export const IS_NET_LOG = true 

// 是否 打开 应用程序里面的 打印
export const IS_DEBUG_LOG = true

// 是否 开启 测试 模式
export const IS_TEST_MODE = true

// 网络有关的 配置，请查看 net.ts
export const TEST_LOGIN_USER: ONE = {
    'ADMIN': <ONE>{
        username: 'qiong',
        password: 'ZT123zlt'
    },
    'AUTH': <ONE>{
        username: 'qiong2',
        password: 'ZT123zlt'
    }
}

export const K_STRAPI = 'strapi'

// 后端连接模式
export const CONF_NET_CONNECTION_MODE = K_STRAPI

export const is_strapi_mode = () => (CONF_NET_CONNECTION_MODE == K_STRAPI)