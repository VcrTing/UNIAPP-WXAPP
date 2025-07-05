
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import memory_tool from '../__func/memory_tool';
import server_order_product from '@/server/order/server_order_product';
import { arrfindi } from '@/tool/util/iodash';
import { DEV_DOC_ID } from '@/conf/conf-dev';

const _s: Store<ProductStore> = createStore({
    
    state: <ProductStore> {
        buys: <string[]>[ ],
        one: { },
        view: { },
        ioading: false,
    },
    getters: {
        
    },
    mutations: {
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // 刷新我的购买
        refresh_buys: async ({ state, commit }) => {
            return await memory_tool.locking(state, commit, state.buys, async () => {
                const ids: string[] = await server_order_product.mine({ })
                if (is_nice_arr(ids)) {
                    state.buys = must_arr(ids)
                    console.log('我购买了 =', ids)
                }
            })
        },

        // 检测是否购买了
        is_buyed: async ({ state, commit }, v: Product): Promise<boolean> => {
            const buys: string[] = must_arr(state.buys)
            const i: number = arrfindi(buys, v[DEV_DOC_ID], DEV_DOC_ID)
            return i >= 0
        }
    }
})

export default _s