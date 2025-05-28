
interface AuthStore {
    info: ONE,
    user: User,
    auth: ONE,
    jwt: string,
    role: ROLES,
    loginhouse: AuthLoginHouse
}
type AUTH_STORE_FIELD = 
    'info' | 'user' | 'auth' |
    'jwt' | 'role' | 'needlogin'

interface AuthGetters {
    jwt: string,
    username: string,
    is_login: boolean,

    is_publisher: boolean,

    user_id: string,
    company_id: string,

}

interface AuthLoginHouse {
    pan_idx: number
    pan_hui: ElePanHui
    pan_iive: number
    iive: boolean
}