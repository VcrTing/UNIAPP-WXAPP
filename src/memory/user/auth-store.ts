
import { ROLE_ANON, ROLE_AUTH } from '@/conf/conf-role';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';

export enum AutoLoginStatus {
    ALREADY_LOGIN,
    AUTO_SUCCESS,
    AUTO_FAIL
}

const _s: Store<AuthStore> = createStore({
    
    state: <AuthStore>{
        info: <ONE>{ },
        user: <ONE>{ },
        auth: <ONE>{ },
        jwt: '',
        role: ROLE_ANON,
        company: <ONE>{ },
    },
    getters: {
        jwt: s => s.jwt,
        username: s => s.user.username,
        user_id: s => s.user.id,
        company_id: s => s.company.id,
        is_login: s => (s.role === ROLE_ANON) ? false : ( s.jwt && (s.jwt.length > 0) ),
        is_publisher: s => (s.user.publisher)
    },
    mutations: {
        _login: (s: ONE, auth: ONE) => {
            storage.set('jwt', auth.token)
            s.company = auth.company 
            s.user = auth.user 
            s.jwt = auth.token 
            s.role = ROLE_AUTH
        },
        _logout: (s: ONE) => {
            storage.remove('jwt')
            s.company = { }
            s.user = { }
            s.auth = { }
            s.role = ROLE_ANON
        }
    },

    actions: {
        // 使用案例，vuex.dispatch('change', [ 'ioading', -1 ])
        // 或者 authReFresh('ioading', -1)
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),
        /**
         * 
         */
        login: ({ commit }, auth: ONE) => {
            storage.set('auth', auth)
            commit('_login', auth)
        },
        logout: ({ commit }) => {
            console.log('登出');
            commit('_logout')
        },
        // 1 自动登录成功，0 已经登录了，-1 
        auto_login: ({ getters, commit }): AutoLoginStatus => {
            if (!getters.is_login) {
                const auth: ONE | undefined = storage.get('auth')
                if (auth) {
                    commit('_login', auth); 
                    return AutoLoginStatus.AUTO_SUCCESS
                } 
                return AutoLoginStatus.AUTO_FAIL
            }
            return AutoLoginStatus.ALREADY_LOGIN
        }
       
    }
})

export default _s