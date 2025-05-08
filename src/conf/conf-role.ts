

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