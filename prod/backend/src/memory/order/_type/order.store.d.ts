
interface OrderItem {
    one: Activity
    joiner: User
}

interface OrderStore {
    order_of_place: OrderItem,
    orders_of_iive: OrderItem[ ],

    __ioading: boolean,
    
    num: number,
    join_of_mine: ActivityJoin[ ]
}

type ORDER_STORE_FIELD = 
    'order_of_place' | 'orders_of_iive' | 'ioading'
