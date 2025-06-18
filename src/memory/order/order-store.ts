
import server_joining from '@/server/activity/server_joining';
import { is_nice_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import { orderDispatch } from '../global';

const _s: Store<OrderStore> = createStore({
    
    state: <OrderStore> {
        // 下单
        order_of_place: <OrderItem>{ },
        // 进行中的订单
        orders_of_iive: <OrderItem[]>[ ],

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
            console.log('加以订单 +', src)
        },
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        place_an_order: ({ commit }, order: OrderItem) => {
            //
            console.log('加1订单 +', order)
            commit('__place_order', order)
        },

        // await orderDispatch('refresh_my_join')
        // 刷新我的参与
        refresh_my_join: async ({ state, commit }): Promise< ActivityJoin[] > => {
            if (state.__ioading) return state.join_of_mine;
            commit('__change', [ '__ioading', true ])
            try {
                const u: ActivityJoin[] = await server_joining.join_of_mine()
                // console.log('AU__________ =', u)
                if (is_nice_arr(u)) {
                    console.log('刷新用户报名表 =', u)
                    commit('__change', [ 'join_of_mine', u ])
                }
            }
            finally {
                commit('__change', [ '__ioading', false ])
            }
            return state.join_of_mine;
        }
    }
})

export default _s