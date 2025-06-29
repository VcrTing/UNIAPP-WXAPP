
interface AuthStore {
    phonedata: AppPhoneWX
    __unreal: AppPhoneWX
    info: ONE
    user: User
    auth: AppAuth
    jwt: string
    role: ROLES
    num: number
    __ioading: boolean
    loginhouse: AuthLoginHouse

    addr: UserAddress

    mainpage: UserMainPage
    mainpages: UserMainPage[]
    mainpage_of_view: UserMainPage
}
type AUTH_STORE_FIELD = 
    'info' | 'user' | 'auth' | 'num' | 'addr' |
    'jwt' | 'role' | 'needlogin' | 'mainpage' | 'mainpage'

interface AuthGetters {
    jwt: string,
    username: string,
    is_login: boolean,
    __fresh: number,
    is_publisher: boolean,

    userid: string,
    user_doc_id: string,
    company_id: string,

    addr: UserAddress | null
}

interface AuthLoginHouse {
    pan_idx: number
    pan_hui: ElePanHui
    pan_iive: number
    iive: boolean
}