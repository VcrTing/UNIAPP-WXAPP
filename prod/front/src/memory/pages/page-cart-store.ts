
import { Store, createStore } from 'vuex';
import memory_tool from '../__func/memory_tool';
import { arrcoii, arrfind, arrfindi, arrlen_same } from '@/tool/util/iodash';
import { DEV_DOC_ID } from '@/conf/conf-dev';
import { is_nice_arr, is_nice_one, must_arr } from '@/tool/util/valued';
import cart_tool from '@/tool/modules/cart_tool';
import server_user_cart from '@/server/user/cart/server_user_cart';
import jsoner from '@/tool/util/jsoner';

const _s: Store<Page.CartPageStore> = createStore({
    
    state: <Page.CartPageStore>{
        num: 0,
        __ioading: false,
        carts: <Page.CartDataOptions>[ ],
        carts_of_order: <Page.CartDataOptions>[ ],
        data: <UserCart>{ }
    },
    getters: {
        
    },
    mutations: {
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
        __num: (s: ONE) => { s.num = s.num + 1; },
    },

    actions: {
        // 使用案例，vuex.dispatch('change', [ 'ioading', -1 ])
        // 或者 authReFresh('ioading', -1)
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),
        // 开启刷新
        refresh: (c: ONE) => { c.commit('__num') },

        // 加入购物车
        cart_add: async ({ state, commit }, v: Product) => {
            return await memory_tool.locking(state, commit, state.carts, async () => {
                const carts: Page.CartDataOptions = cart_tool.cart_add(state.carts, v)
                state.carts = carts
                console.log('加入购物车 =', state.carts)
                // 同步数据库
                state.data = await server_user_cart.plus_or_edit(carts, state.data)
            })
        },
        // 减去购物车
        cart_min: async ({ state, commit }, v: Product) => {
            return await memory_tool.locking(state, commit, state.carts, async () => {
                const carts: Page.CartDataOptions = cart_tool.cart_min(state.carts, v)
                state.carts = carts
                console.log('减去购物车 =', state.carts)
                // 同步数据库
                state.data = await server_user_cart.plus_or_edit(carts, state.data)
            })
        },

        // 减去 下单的
        carts_clean: async ({ state, commit }, carts_finished: Page.CartDataOptions) => {
            return await memory_tool.locking(state, commit, state.carts, async () => {
                if (is_nice_arr(carts_finished)) {
                    const choise: string[] = arrcoii(carts_finished, DEV_DOC_ID)
                    const carts: Page.CartDataOptions = cart_tool.carts_clean(state.carts, choise)
                    state.carts = carts
                    console.log('清空已买的购物车 =', state.carts)
                    // 同步数据库
                    state.data = await server_user_cart.plus_or_edit(carts, state.data)
                }
            })
        },

        // 刷新 购物车数据
        refresh_cart: async ({state, commit}) => {
            return await memory_tool.locking(state, commit, state.data, async () => {
                const src: UserCart = await server_user_cart.mine()
                console.log('搜索我的购物车 =', src)
                if (is_nice_one(src)) {
                    const carts = must_arr(jsoner.parse(src.content))
                    state.carts = carts
                }
            })
        },

        // 是否需要同步
        need_async: async ({state, commit}, cs: Page.CartDataOptions) => {
            
            if (arrlen_same(cs, state.carts)) {

            }
            // 同步
            else {
                state.carts = cs
                state.data = await server_user_cart.plus_or_edit(cs, state.data)
            }
        },
    }
})

export default _s