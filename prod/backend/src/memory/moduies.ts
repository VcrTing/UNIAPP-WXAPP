
import { Store } from 'vuex'
import prod from './product/product-store'

// prod
export const prodStore: Store<ProductStore> = prod
export const prodState: ProductStore = prod.state
export const prodGetters: ONE = prod.getters
export const prodCommit: Function = prod.commit
export const prodDispatch: Function = prod.dispatch
export const prodReFresh: (n: PRODUCT_STORE_FIELD, v: any) => void = (n: PRODUCT_STORE_FIELD, v: any) => 
    prod.dispatch('change', [ n, v ])