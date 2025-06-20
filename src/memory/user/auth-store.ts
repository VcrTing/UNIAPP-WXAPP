
import { ROLE_ANON, ROLE_AUTH, USER_DEF } from '@/conf/conf-role';
import server_me from '@/server/user/server_me';
import server_user from '@/server/user/user/server_user';
import pan_tooi from '@/tool/app/pan_tooi';
import { arrfindi } from '@/tool/util/iodash';
import { is_nice_arr } from '@/tool/util/valued';
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

const locking = async <T>(state: ONE, commit: Function, def: T, func: Function): Promise<T> => {
    if (state.__ioading) return def;
    commit('__change', [ '__ioading', true ])
    try {
        const s: T = await func()
        if (s) {
            return s
        }
    }
    finally {
        commit('__change', [ '__ioading', false ])
    }
    return def;
}

const _s: Store<AuthStore> = createStore({
    
    state: <AuthStore>{
        phone: '',
        info: <ONE>{ },
        user: <User>USER_DEF,
        auth: <ONE>{ },
        addr: <UserAddress>{ iive: false },
        jwt: '',
        role: ROLE_ANON,
        num: 0,
        __ioading: false,
        loginhouse: {
            pan_idx: 1000,
            pan_hui: { opacity: 0.4 },
            iive: true
        },
        mainpage: <UserMainPage>{ },
        mainpages: <UserMainPage[]>[ ],
        mainpage_of_view: <UserMainPage>{ }
    },
    getters: {
        jwt: s => s.jwt,
        __fresh: s => s.num,
        username: s => s.user.nickname,
        phone: s => s.phone,
        userid: s => s.user.id,
        company_id: s => s.company.id,
        is_login: s => islogin(s),
        is_publisher: s => (s.user.publisher),
        addr: s => {
            const d: UserAddress = s.addr || { }
            if (d && d.iive) return d
            return null
        }
    },
    mutations: {
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
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
                console.log('打开登录 PAN')
                return true
            }   
            return false
        },

        // 更新
        refresh_info: async ({ state, commit }): Promise<User> => {
            return await locking(state, commit, state.user, async () => {
                const u: User = await server_me.one(state.user.id)
                if (u && u.id) {
                    commit('_login', { user: u, token: u.documentId })
                    // console.log('刷新用户数据 =', u)
                    commit('__change', [ 'user', u ])
                    return u;
                }
                return null
            })
        },

        // 获取我的主页信息
        refresh_mainpage: async ({ state, commit }): Promise<UserMainPage> => {
            return await locking(state, commit, state.mainpage, async () => {
                const u: UserMainPage = await server_user.mymainpage()
                console.log('刷新我的主页数据 =', u)
                if (u && u.documentId) {
                    commit('__change', [ 'mainpage', u ])
                    return u;
                }
                return null
            })
        },

        // 获取某人的主页信息
        fetch_someone_mainpag: async ({ state, commit }, { userid }): Promise<UserMainPage> => {
            const srcs: UserMainPage[] = state.mainpages || []
            console.log('userid =', userid, ' srcs =', srcs)
            const iii: number = arrfindi(srcs, userid, 'id')
            if (iii < 0) {
                const u: UserMainPage = await server_user.mainpage(userid)
                console.log('获取某人主页 =', u)
                srcs.push(u);
                commit('__change', [ 'mainpages', srcs ]);
                commit('__change', [ 'mainpage_of_view', u ]);
                return u;
            }
            else {
                commit('__change', [ 'mainpage_of_view', srcs[ iii ] ]);
                return srcs[ iii ]
            }
            return <UserMainPage>{ }
        }
    }
})

export default _s