
interface ProductStore {
    one: Product
    view: Product
    ioading: boolean

    buys: string[]

    prefers: TagPrefer[]
    prefers_inited: boolean
}

type PRODUCT_STORE_FIELD = 
    'one' | 'view' | 'ioading' | 'product'
