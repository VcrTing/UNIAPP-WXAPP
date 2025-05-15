
interface AuthStore {
    info: ONE,
    user: ONE,
    auth: ONE,
    jwt: string,
    role: ROLES,
    company: ONE,
}
type AUTH_STORE_FIELD = 
    'info' | 'user' | 'auth' |
    'jwt' | 'role' | 'company'

interface AuthGetters {
    jwt: string,
    username: string,
    is_login: boolean,

    is_publisher: boolean,

    user_id: string,
    company_id: string,

}

