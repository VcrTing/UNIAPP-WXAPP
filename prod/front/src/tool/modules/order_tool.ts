import { arrfindi, arrimit } from "@/tool/util/iodash"
import { must_arr, must_int, must_one } from "../util/valued"
import { STS_ORDER } from "@/conf/conf-status"
import { DEV_DOC_ID } from "@/conf/conf-dev"
import { prodState } from "@/memory/moduies"
import { appState, authState } from "@/memory/global"

const rebuild_order_carts = (carts: Page.CartDataOptions): Page.CartDataOptions => {

    const cs: Page.CartDataOptions = [ ]
    if (carts.length > 0) {
        carts.map(e => {
            const ps: Product = must_one(e.product)
            const product: Product | ONE = {
                documentId: ps.documentId, id: ps.id, typed: ps.typed,
                medias: ps.medias, tags: ps.tags, title: ps.title,
                dataStatus: ps.dataStatus, invTyped: ps.invTyped,
            }
            const __e: Page.CartDataOption = {
                documentId: e.documentId,
                prices: e.prices, product: product as Product,
            }
            cs.push(__e)
        })
    }
    return cs
}

const group_order_data = (form: ONE, xuser: User, carts: Page.CartDataOptions): XOrder => {
    //
    /*
    */
    return <XOrder>{
        num: form.num,
        price: form.price,
        sendType: 0,
        sendPrice: 0,

        remark: form.remark,
        userCode: xuser.phone,
        userPhone: xuser.phone,
        userDocumentId: xuser.documentId,

        carts: rebuild_order_carts(carts),
        user: authState.user,

        name: xuser.nickName,
        phone: xuser.phone,
        // address: form.addr.address
    }
}

const getcarts = (v: XOrder) => {
    let ps: Page.CartDataOptions = v.carts || [ ]
    return ps
}

const ispayed = (v: XOrder): boolean => {
    const s: number = must_int(v.payStatus)
    return s === STS_ORDER.PAY.YES
}

const isbuyed = (v: Product): boolean => {
    const buys: string[] = must_arr(prodState.buys)
    const i: number = buys.indexOf(v[DEV_DOC_ID])
    return i >= 0

}

// 获取客服
const get_contacts = (v: XOrder): User[] => {
    const info = appState.info || { }
    const user: User[] = must_arr(info.contacts)
    return user
}

export default {
    group_order_data,
    getcarts,
    ispayed,
    isbuyed,
    get_contacts
}