
import { for_user_loging } from '@/conf/__for_index/for_user_loging';
import { ROLE_ANON, ROLE_AUTH, USER_DEF, USER_TEST } from '@/conf/conf-role';
import pan_tooi from '@/tool/app/pan_tooi';
import { formfii, is_nice_one, must_one } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';
import server_me from '@/server/user/server_me';

const __K_OF_USER_AUTH = "USER_AUTH"

const __K_OF_ID = "USER_ID"

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
    },
    getters: {
        jwt: s => s.jwt,
        __fresh: s => s.num,
        username: s => s.user.nickname,
        phone: s => s.phone,
        userid: s => {
            const id: number = (s.user.id || 0)
            if (id) {
                return id
            }
            else {
                return storage.get('__K_OF_ID') || 0
            }
        },
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
            s.auth = auth
            s.user = auth.user 
            s.jwt = auth.jwt 
            s.role = ROLE_AUTH
            s.phonedata = auth.phonedata
            s.loginhouse.iive = false
            s.num = s.num + 1;
            
            storage.set(__K_OF_USER_AUTH, auth)
            storage.set(__K_OF_ID, auth.user.id)
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

        // 修改个人信息
        change_info: async ({state, commit}, u: User): Promise<User> => {
            const ori: User = state.user
            const res: User = await server_me.edit(u, ori)
            if (res && res.documentId) {
                // tipsucc('个人资料修改成功。')
                // formfii(ori, u)
                commit('__change', [ 'user', res ])
                const auth = state.auth
                auth.user = res
                commit('__change', [ 'auth', auth ])
                // console.log('替换 user =', res, ' o =', state.user)
                storage.set(__K_OF_USER_AUTH, auth)
                return res
            }
            return ori
        }
    }
}) 

export default _s
