
import server_joining from '@/server/activity/server_joining';
import { is_nice_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import { authGetters } from '../global';

const _s: Store<OrderStore> = createStore({
    
    state: <OrderStore> {
        // 下单
        order_of_place: <OrderItem>{ },
        // 进行中的订单
        orders_of_iive: <OrderItem[]>[ ],
        // 当前下单成功
        order_of_succ: <XOrder>{ },

        // 用户的参与记录
        join_of_mine: <ActivityJoin[]>[ ],
        __ioading: false,
    },
    getters: {

    },
    mutations: {
        __place_order: (s: OrderStore, order: OrderItem) => {
            const src = s.orders_of_iive
            src.push(order)
            s.orders_of_iive = src;
        },
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        place_an_order: ({ commit }, order: OrderItem) => {
            commit('__place_order', order)
        },

        // await orderDispatch('refresh_my_join')
        // 刷新我的参与
        refresh_my_join: async ({ state, commit }): Promise< ActivityJoin[] > => {
            const is_login: boolean = authGetters.is_login
            if (!is_login) return state.join_of_mine;
            try {
                const u: ActivityJoin[] = await server_joining.join_of_mine()
                if (is_nice_arr(u)) {
                    commit('__change', [ 'join_of_mine', u ])
                }
            }
            finally {
                
            }
            return state.join_of_mine;
        },
    }
})

export default _s