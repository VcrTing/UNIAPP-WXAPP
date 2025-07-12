
interface OrderItem {
    one: Activity
    joiner: User
}

interface OrderStore {
    order_of_place: OrderItem,
    orders_of_iive: OrderItem[ ]

    __ioading: boolean
    
    order_of_succ: Order

    join_of_mine: ActivityJoin[ ]

    num: number
}

type ORDER_STORE_FIELD = 
    'order_of_place' | 'orders_of_iive' | 'ioading'
