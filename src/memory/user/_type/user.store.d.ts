
interface AuthStore {
    phone: string
    info: ONE
    user: User
    auth: ONE
    jwt: string
    role: ROLES
    num: number
    __ioading: boolean
    loginhouse: AuthLoginHouse

    mainpage: UserMainPage
}
type AUTH_STORE_FIELD = 
    'info' | 'user' | 'auth' | 'num' |
    'jwt' | 'role' | 'needlogin'

interface AuthGetters {
    jwt: string,
    username: string,
    is_login: boolean,
    __fresh: number,
    is_publisher: boolean,

    userid: string,
    company_id: string,

}

interface AuthLoginHouse {
    pan_idx: number
    pan_hui: ElePanHui
    pan_iive: number
    iive: boolean
}