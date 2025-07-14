import { arrfindi, arrimit } from "@/tool/util/iodash"
import { must_arr, must_int } from "../util/valued"
import { STS_ORDER } from "@/conf/conf-status"
import { DEV_DOC_ID } from "@/conf/conf-dev"
import { prodState } from "@/memory/moduies"
import { appState, authState } from "@/memory/global"

const group_order_data = (form: ONE, xuser: User, carts: Page.CartDataOptions): XOrder => {
    //
    const cs: Page.CartDataOptions = [ ]
    if (carts.length > 0) {
        carts.map(e => {
            cs.push({
                documentId: e.documentId,
                prices: e.prices
            } as Page.CartDataOption)
        })
    }
    return <XOrder>{
        num: form.num,
        price: form.price,
        sendType: 0,
        sendPrice: 0,

        remark: form.remark,
        userCode: xuser.phone,
        userPhone: xuser.phone,
        userDocumentId: xuser.documentId,

        carts: cs,
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