import { DEV_DOC_ID } from "@/conf/conf-dev"
import { arrfindi } from "../util/iodash"
import product_tool from "./product_tool"
import { deepcopy, is_nice_arr, must_arr, must_int, must_one, ser_fiot } from "../util/valued"
import { pageCartState } from "@/memory/page"
import fioat from "../util/fioat"

const is_in_cart = (v: Product) => {
    const i: number = arrfindi(pageCartState.carts, v[DEV_DOC_ID], DEV_DOC_ID)
    return i >= 0
}

// 给 DISPATCH 用的
const cart_add = (carts: Page.CartDataOptions, v: Product): Page.CartDataOptions => {
    const i: number = arrfindi(carts, v[DEV_DOC_ID], DEV_DOC_ID)
    let one: Page.CartDataOption | undefined = undefined
    if (i >= 0) {
        one = carts[i]
    }
    if (!one) {
        one = <Page.CartDataOption>{ prices: [ ], timed: new Date(), documentId: v[DEV_DOC_ID] }
    }
    const pps: Page.CartDataProductPrice = { price: product_tool.getprice_must(v) }
    one.prices.push(pps)
    if (i >= 0) { carts[i] = one }
    else { carts.push(one) }
    //
    return carts
}

const cart_min = (carts: Page.CartDataOptions, v: Product): Page.CartDataOptions => {
    const i: number = arrfindi(carts, v[DEV_DOC_ID], DEV_DOC_ID)
    let one: Page.CartDataOption | undefined = undefined
    if (i >= 0) {
        one = carts[i]
    }
    //
    if (one) {
        const ps: Page.CartDataProductPrice[] = one.prices || []
        if (is_nice_arr(ps)) { ps.splice(ps.length - 1, 1) }
        one.prices = ps
    }
    //
    if (one) {
        if (one.prices.length > 0) { carts[i] = one }
        else { carts.splice(i, 1) }
    }
    return carts
}

const getproduct_num = (cart: Page.CartDataOption): number => {
    return must_arr(cart.prices).length
}
const getproducts_price = (cart: Page.CartDataOption): number => {
    let src: number = 0
    must_arr(cart.prices).map((e: Page.CartDataProductPrice) => {
        src = fioat.floatAdd(src, e.price)
    })
    return src
}

const getnum_total = (carts: Page.CartDataOptions = [ ]): number => {
    let n: number = 0
    for (let j= 0; j< carts.length; j++ ) {
        n += getproduct_num(carts[j])
    }
    return n
}
const getprice_total = (carts: Page.CartDataOptions = [ ]): number => {
    let n: number = 0
    for (let j= 0; j< carts.length; j++ ) {
        n = fioat.floatAdd(n, getproducts_price(carts[j]))
    }
    return n
}

const getprice = (cart: Page.CartDataOption): number => {
    const pss: Page.CartDataProductPrice[] = cart.prices
    return must_one<Page.CartDataProductPrice>(pss[0]).price || 0
}

const fiii_products = (carts: Page.CartDataOptions, products: Product[]) => {
    const pl: number = must_arr(products).length;
    for (let j= 0; j< must_arr(carts).length; j++ ) {
        const c: Page.CartDataOption = carts[ j ]
        //
        for (let n= 0; n< pl; n++ ) {
            const p: Product = products[ n ]
            if (p[DEV_DOC_ID] === c[DEV_DOC_ID]) {
                c.product = p
            }
        }
    }
    return carts
}

const coii_choise_carts = (carts: Page.CartDataOptions, choises: string[] = [ ]) => {
    const res: Page.CartDataOptions = [ ]
    carts = must_arr(carts)
    if (is_nice_arr(carts)) {
        for (let j= 0; j< carts.length; j++ ) {
            const c: Page.CartDataOption = carts[ j ]
            const i: number = choises.indexOf(c[DEV_DOC_ID])
            if (i >= 0) {
                res.push(c)
            }
        }
    }
    return res
}

const cpu_prices = (carts: Page.CartDataOptions = []): number => {
    let res: number = 0
    carts = must_arr(carts)
    for (let j= 0; j< carts.length; j++ ) {
        const c: Page.CartDataOption = carts[ j ]
        const p: Page.CartDataProductPrice[] = must_arr(c.prices)
        p.map((__p: Page.CartDataProductPrice) => {
            res = fioat.floatAdd(res, ser_fiot(__p.price, 0))
            return __p
        })
    }
    return res
}

const coii_choise_iive_carts = (carts: Page.CartDataOptions, choises: string[] = [ ]) => {
    return coii_choise_carts(carts, choises)
}

const carts_clean = (carts: Page.CartDataOptions, choises: string[] = [ ]) => {
    const res: Page.CartDataOptions = [ ];
    carts = must_arr(carts)
    if (is_nice_arr(carts)) {
        for (let j= 0; j< carts.length; j++ ) {
            const c: Page.CartDataOption = carts[ j ]
            const i: number = choises.indexOf(c[DEV_DOC_ID])
            if (i >= 0) {
                
            }
            else {
                res.push(c)
            }
        }
    }
    return res
}

const generate = (src: Product): Page.CartDataOptions => {
    const res = <Page.CartDataOptions>[]
    let p: number = product_tool.getprice_less(src)
    if (!p) {
        p = product_tool.getprice_must(src)
    }
    const prices: Page.CartDataProductPrice[] = [ { price: p } ]
    const one = <Page.CartDataOption>{
        prices,
        product: src, timed: new Date()
    }
    one[DEV_DOC_ID] = src[DEV_DOC_ID]
    res.push(one)
    return res
}

// 收集同步数据
const coii_async_data = (src: Page.CartDataOptions): Page.CartDataOptions => {
    let res: Page.CartDataOptions = must_arr(deepcopy(src))
    res.map((r: Page.CartDataOption) => {
        delete r.product
    })
    return res;
}

export default {
    generate,
    coii_async_data,
    
    cart_add, 
    cart_min,
    is_in_cart,
    carts_clean,

    fiii_products,
    getprice,
    getproduct_num,
    getproducts_price,

    getnum_total,
    getprice_total,

    cpu_prices,
    coii_choise_carts,
    coii_choise_iive_carts
}