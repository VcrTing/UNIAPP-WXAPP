

// 匿名访问
export const ROLE_ANON: string = 'ANON'

// 已授权
export const ROLE_AUTH: string = 'AUTH'

// ADMIN
export const ROLE_ADMIN: string = 'ADMIN'


// 里面的角色，都拥有 JWT 权限
export const ROLES_AUTHS: string[] = [
    ROLE_AUTH,
    ROLE_ADMIN
]



// 基础角色
export const USER_DEF = <User>{
    // id: 2,
    // documentId: 'b2zdp5c17dem6rvmj8qo0m3u',
    nickName: '未登录用户',
    avatarUrl: 'https://img2.baidu.com/it/u=465760855,3158087440&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    background: '', 
    age: 18,
    gender: 1,
    phone: '135',
    introduction: '未登录用户，无法参加活动，请先登录。',
    socialAccount: '无社交账号展示'
}

// 测试用户
export const USER_TEST = <ONE>{
    '0': <AppPhoneWX>{
        countryCode: '86',
        phoneNumber: '13576639986',
        purePhoneNumber: '13576639986'
    },
    '1': <AppPhoneWX>{
        countryCode: '86',
        phoneNumber: '13576639987',
        purePhoneNumber: '13576639987'
    },
    '2': <AppPhoneWX>{
        countryCode: '86',
        phoneNumber: '13576639988',
        purePhoneNumber: '13576639988'
    }
}