
// 是否 打开 网络请求的 打印
export const IS_NET_LOG = true 

// 是否 打开 应用程序里面的 打印
export const IS_DEBUG_LOG = true

// 是否 开启 测试 模式
export const IS_TEST_MODE = true

export const IS_TEST_DEV = false

export const IS_TEST_MODE_NET = false

export const HOST = IS_TEST_MODE_NET ? 'localhost' : '119.91.64.45'

// 网络有关的 配置，请查看 net.ts
export const TEST_LOGIN_USER: ONE = {
    'ADMIN': <ONE>{
        username: 'qiong',
        password: 'ZT123zlt'
    },
    'AUTH': <ONE>{
        username: 'qiong2',
        password: 'ZT123zlt'
    },
    /*
    SMALL: <ONE> {
        phone: '13576639986',
        countryCode: 86,
        code: '1234567',
        info: {
            avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
            city: "",
            country: "",
            gender: 0,
            is_demote: true,
            language: "",
            nickName: "微信用户",
            province: "",
        }
    }
        */
}

export const K_STRAPI = 'strapi'

// 后端连接模式
export const CONF_NET_CONNECTION_MODE = K_STRAPI

export const is_strapi_mode = () => (CONF_NET_CONNECTION_MODE == K_STRAPI)