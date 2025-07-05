
interface ProductStore {
    one: Product
    view: Product
    ioading: boolean

    buys: string[]
}

type PRODUCT_STORE_FIELD = 
    'one' | 'view' | 'ioading' | 'product'
