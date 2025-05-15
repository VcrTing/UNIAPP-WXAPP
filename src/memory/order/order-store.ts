
import { Store, createStore } from 'vuex';

const _s: Store<OrderStore> = createStore({
    
    state: <OrderStore> {
        // 下单
        order_of_place: { },
        // 进行中的订单
        orders_of_iive: <OrderItem[]>[ ]
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
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        place_an_order: ({ commit }, order: OrderItem) => {
            //
            console.log('加1订单 +', order)
            commit('__place_order', order)
        },
    }
})

export default _s