
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import { NET_BASIC_PROFILE } from '@/conf/conf-net';
import server_app_info from '@/server/app/server_app_info';
import server_auth_strapi from '@/server/auth/server_auth_strapi';
import { has_document } from '@/tool/web/doc';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';

const ADMIN_AUTH_K = 'APP_STORE_ADMIN_AUTH'

const __iogin = async (commit: any) => {
    const ar: AuthResult = await server_auth_strapi.login(NET_BASIC_PROFILE.username, NET_BASIC_PROFILE.password)
    if (ar && ar.jwt) {
        commit('change', [ 'jwt', ar.jwt ])
        commit('change', [ 'admin', ar.user ])

        storage.set(ADMIN_AUTH_K, ar)
    }
}

const _appStore: Store<AppStore> = createStore({
    
    state: <AppStore>{
        info: <AppInfo>APP_GENERATE_DETAIL,

        document: has_document(),

        jwt: '',
        admin: <User>{ },

        // 全局加载标识, -1 = close. 0 = loading
        ioading: -1,

        pan: -1,
        pan_z_index: 398,
    },
    getters: {
        // getters 里面不带 刷新页面的，请求一次获取一次状态，值固定的
        // is_ioading (state) { return state.ioading >= 0 },
        // is_ioading: s => s.ioading >= 0,
        jwt: s => s.jwt
    },
    mutations: {
        // 使用案例，vuex.commit('change', [ 'ioading', -1 ])
        // 意思是 把 ioading 改为 -1
        // change (state: any, v: ANYS) { state[v[0]] = v[1] },
        // 从此，去掉 mutations 里面的东西
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },

    // 注意
    // action 基本不异步，要异步在页面方法内异步
    // 但是 action 要返回值，那么就是 Promise<值>
    // mutations 没法返回值
    actions: {
        // 使用实例 appStore.dispatch('change', [ 'ioading', -1 ])
        // 直接在 actions 里面修改 state, 还能异步
        // actions 里面可以异步，所以，能用 actions 尽量用 actions
        // change: ({ commit, state }, v: ANYS ) => setTimeout(() => commit('change', v), 1),
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        ioadinfo: async ({ state, commit }) => {
            const info: AppInfo = await server_app_info.info()
            commit('change', [ 'info', info ])
        },

        // 进入，获取 AUTH
        inauth: async ({ state, commit }) => {
            await __iogin(commit)
        },
        // 检测自动登录 ADMIN
        autoauth: async ({ state, commit }) => {
            let ar: AuthResult | undefined = storage.get(ADMIN_AUTH_K)
            if (ar && ar.jwt) {
                // 检测 token 是否过期
                let isfail = false
                if (isfail) {
                    // 重新登录
                    await __iogin(commit)
                }
                else {
                    // 继续登录
                    commit('change', [ 'jwt', ar.jwt ])
                    commit('change', [ 'admin', ar.user ])
                }
            }
            else {
                // 重新登录
                await __iogin(commit)
            }
        },
    }
})

export default _appStore


/*
actions 使用案例
...mapActions([
    'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    // `mapActions` 也支持传参数：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
*/

        // menu = 0 永远首页
        // menu: 0,

        // page = 'index' | null 永远首页
        // page: 'index',

        // hui: -1,
        // hui_z_index: 495,

        // MOD 占用 500 系列
        // mod: -1,
        // mod_z_index: 498,

        // PAN 占用 400 系列