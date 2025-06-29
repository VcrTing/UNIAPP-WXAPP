
import { for_user_loging } from '@/conf/__for_index/for_user_loging';
import { ROLE_ANON, ROLE_AUTH, USER_DEF, USER_TEST } from '@/conf/conf-role';
import server_user from '@/server/user/user/server_user';
import pan_tooi from '@/tool/app/pan_tooi';
import { arrfindi } from '@/tool/util/iodash';
import { is_nice_one, must_one } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';

const __K_OF_USER_AUTH = "USER_AUTH"

export enum AutoLoginStatus {
    ALREADY_LOGIN,
    AUTO_SUCCESS,
    AUTO_FAIL
}

const islogin = (s: ONE): boolean => {
    // const auth: AppAuth = s.auth || { }
    // const p: string = (auth.phonedata || { }).phoneNumber || ''
    return (s.jwt && s.jwt.length > 0) ? true : false // (s.role !== ROLE_ANON) && 
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
        phonedata: <AppPhoneWX>{ },
        __unreal: USER_TEST[0],
        info: <ONE>{ },
        user: <User>USER_DEF,
        auth: <ONE>{ },
        addr: <UserAddress>{ 
            iive: true,
            longitude: 114.0305, latitude: 22.6171
        },
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
        userid: s => (s.user.id || '') + '',
        user_doc_id: s => (s.user.documentId || ''),
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
        __num: (s: ONE) => {
            s.num = s.num + 1
        },
        __login: (s: ONE, auth: AppAuth) => {
            console.log('执行登录 =', auth, __K_OF_USER_AUTH)
            storage.set(__K_OF_USER_AUTH, auth)
            s.auth = auth
            s.user = auth.user 
            s.jwt = auth.jwt 
            s.role = ROLE_AUTH
            s.phonedata = auth.phonedata
            s.loginhouse.iive = false
            s.num = s.num + 1
        },
        __logout: (s: ONE) => {
            storage.remove(__K_OF_USER_AUTH)
            s.auth = { }
            s.user = USER_DEF
            s.jwt = ''
            s.role = ROLE_ANON
            s.phonedata = { }
            s.loginhouse.iive = true
            s.num = s.num + 1
        },
    },

    actions: {
        // 使用案例，vuex.dispatch('change', [ 'ioading', -1 ])
        // 或者 authReFresh('ioading', -1)
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),
        /**
         * 
         */
        login: ({ commit }, auth: AppAuth) => { commit('__login', auth) },
        logout: ({ commit }) => { commit('__logout') },
        // 0 加载虚幻号码

        // 1 自动登录成功，0 已经登录了，-1 
        auto_login: ({ getters, commit }): AutoLoginStatus => {
            if (!getters.is_login) {
                const auth: AppAuth | undefined = storage.get(__K_OF_USER_AUTH)
                console.log(__K_OF_USER_AUTH + ' =', auth)
                if (auth) {
                    // 检测
                    const user: User = must_one(auth.user)
                    if (user.id) {
                        // console.log('=== 自动登录成功 ===', auth)
                        commit('__login', auth); 
                        for_user_loging()
                        return AutoLoginStatus.AUTO_SUCCESS
                    }
                    else {
                        console.log("=== 自动登录失效 ===")
                    }
                } 
                else {
                    console.log("=== 自动登录失效 2 ===")
                }
                return AutoLoginStatus.AUTO_FAIL
            }
            return AutoLoginStatus.ALREADY_LOGIN
        },

        // 打开登录 MODAL
        mod_login: ({ state }) => {
            const hs = state.loginhouse;
            pan_tooi.open_def_b(hs.pan_idx, hs.pan_hui)
        },
        
        // 先判断是否需要登录, true = 需要
        need_login: ({ state, commit }): boolean => {
            const _lg = islogin(state)
            console.log('是否登录了 =', _lg, state.auth, state.user)
            if (!_lg) {
                const hs = state.loginhouse;
                commit('__num')
                
                // if (hs.iive) 
                    pan_tooi.open_def_b(hs.pan_idx, hs.pan_hui);
                return true
            }   
            return false
        },

        // 获取我的主页信息
        refresh_mainpage: async ({ state, commit, getters }): Promise<UserMainPage> => {
            return await locking(state, commit, state.mainpage, async () => {
                const origin: UserMainPage = must_one(state.mainpage)
                if (origin.documentId && origin.user && origin.user.documentId) {
                    return origin
                }
                if (getters.is_login) {
                    const u: UserMainPage = await server_user.mymainpage()
                    console.log('========= 刷新我的主页数据 =', u)
                    if (u && u.documentId) {
                        commit('__change', [ 'mainpage', u ])
                        return u;
                    }
                }
                else {
                    console.log('========= 未登录，不刷主页')
                }
                return null
            })
        },

        clean_someone_mainpag: ({ state, commit }) => {
            commit('__change', [ 'mainpage_of_view', { } ]);
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
            // return <UserMainPage>{ }
        }
    }
}) 

export default _s


        // 更新
        /*
        refresh_info: async ({ state, commit }): Promise<User> => {
            return await locking(state, commit, state.user, async () => {
                const uid: number = state.user.id;
                if (uid) {
                    const u: User = await server_me.one(uid)
                    if (u && u.id) {
                        commit('__login', { user: u, token: u.documentId })
                        console.log('========= 刷新用户数据 =', u)
                        commit('__change', [ 'user', u ])
                        return u;
                    }
                }
                return null
            })
        },
        */