
interface OrderItem {
    one: ONE | null,
    assistant: ONE | null
}

interface OrderStore {
    order_of_place: OrderItem,
    orders_of_iive: OrderItem[ ],
    ioading: number,
}

type ORDER_STORE_FIELD = 
    'order_of_place' | 'orders_of_iive' | 'ioading'
