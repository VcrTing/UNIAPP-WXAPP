
import { ROLE_ANON, ROLE_AUTH, USER_DEF } from '@/conf/conf-role';
import pan_tooi from '@/tool/app/pan_tooi';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';

export enum AutoLoginStatus {
    ALREADY_LOGIN,
    AUTO_SUCCESS,
    AUTO_FAIL
}

const islogin = (s: ONE): boolean => {
    return (s.role === ROLE_ANON) ? false : ( s.jwt && (s.jwt.length > 0) )
}

const _s: Store<AuthStore> = createStore({
    
    state: <AuthStore>{
        phone: '',
        info: <ONE>{ },
        user: <User>USER_DEF,
        auth: <ONE>{ },
        jwt: '',
        role: ROLE_ANON,
        num: 0,
        loginhouse: {
            pan_idx: 1000,
            pan_hui: { opacity: 0.4 },
            iive: true
        }
    },
    getters: {
        jwt: s => s.jwt,
        __fresh: s => s.num,
        username: s => s.user.nickname,
        phone: s => s.phone,
        user_id: s => s.user.id,
        company_id: s => s.company.id,
        is_login: s => islogin(s),
        is_publisher: s => (s.user.publisher)
    },
    mutations: {
        _num: (s: ONE) => {
            s.num = s.num + 1
        },
        _login: (s: ONE, auth: ONE) => {
            storage.set('jwt', auth.token)
            s.user = auth.user 
            s.jwt = auth.token 
            s.role = ROLE_AUTH

            s.loginhouse.iive = false
        },
        _logout: (s: ONE) => {
            storage.remove('jwt')
            s.company = { }
            s.user = USER_DEF
            s.auth = { }
            s.role = ROLE_ANON

            s.loginhouse.iive = true
        },
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
            console.log('auth =', auth)
            commit('_login', auth)
        },
        logout: ({ commit }) => {
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
        },
        
        // 先判断是否需要登录, true = 需要
        need_login: ({ state, commit }): boolean => {
            const _lg = islogin(state)
            if (!_lg) {
                const hs = state.loginhouse;
                commit('_num')
                if (hs.iive) pan_tooi.open_def_b(hs.pan_idx, hs.pan_hui);
                return true
            }   
            return false
        },

        // 
    }
})

export default _s