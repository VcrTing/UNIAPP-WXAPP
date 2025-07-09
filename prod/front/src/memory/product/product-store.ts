
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import memory_tool from '../__func/memory_tool';
import server_order_product from '@/server/order/server_order_product';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { DEV_DOC_ID } from '@/conf/conf-dev';
import server_prefer from '@/server/common/server_prefer';

const __prefers = async (s: ONE) => {
    if (s.prefers_inited) {
        return s.prefers
    }
    else {
        const mines: TagPrefer[] = await server_prefer.mine()
        s.prefers = must_arr(mines)
        s.prefers_inited = true
    }
    return s.prefers
}

const _s: Store<ProductStore> = createStore({
    
    state: <ProductStore> {
        buys: <string[]>[ ],
        one: { },
        view: { },
        ioading: false,


        prefers: <TagPrefer[]> [ ],
        prefers_inited: false
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
        },

        // await prodDispatch('refresh_prefer')
        // 首页刷新 PREFERS
        refresh_prefer: async ({ state, commit }) => {
            return __prefers(state)
        },
        // 新增一个产品
        add_view: async ({ state, commit }, tags: Tag[] = [ ]) => {
            const pool = await __prefers(state); // must_arr(state.prefers)
            //
            for (let j= 0; j< tags.length; j++ ) {
                const src: Tag = tags[j]
                //
                if (src && src.documentId) {
                    let tar: TagPrefer = arrfind(pool, src.documentId, 'tagId')
                    const res: TagPrefer = await server_prefer.plus_or_edit(src, tar, [ 'numView' ])
                    //
                    const i: number = arrfindi(pool, src[DEV_DOC_ID], DEV_DOC_ID)
                    pool[i] = res
                }
            }
            // 更新
            state.prefers = pool
        }
    }
})

export default _s