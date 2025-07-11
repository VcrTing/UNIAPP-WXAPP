import { authGetters } from "@/memory/global"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import cart_tool from "@/tool/modules/cart_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import jsoner from "@/tool/util/jsoner"
import { is_str } from "@/tool/util/typed"
import { is_nice_one, is_nice_sn, must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<UserCart[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('cart', null, __pm)
    if (is_str(src)) return netip(src, <UserCart[]>[]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserCart>(res)
}

const mine = async (param: ONE = { }): Promise<UserCart> => {
    srp_p.__eq(param, 'userId', authGetters.userid)
    const src: UserCart[] = await fetching(param, net_tool.__pager());
    const one: UserCart = must_one(src[0]);
    if (is_nice_one(one)) {
        one.carts = must_arr(jsoner.parse(one.content))
    }
    return one;
}

// 改动
const plus_or_edit = async (src: Page.CartDataOptions, one: UserCart): Promise<UserCart> => {
    let docId: string = must_one<UserCart>(one).documentId;
    const cs: Page.CartDataOptions = cart_tool.coii_async_data(src)
    //
    const form: UserCart | ONE = { 
        userId: authGetters.userid + '', content: jsoner.stringify(cs)
    }
    // 先查询
    if (is_nice_sn(docId)) {

    }
    else {
        one = await mine();
        docId = must_one<UserCart>(one).documentId;
    }
    //
    const __pm: ONE = net_tool.build_data( form )
    if (is_nice_sn(docId)) {
        // 修改
        const src: NET_RES = await app.put('cart', docId, __pm)
        if (is_str(src)) return netip(src, <UserCart>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<UserCart>(res)
    }
    else {
        const src: NET_RES = await app.pos('cart', null, __pm)
        if (is_str(src)) return netip(src, <UserCart>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<UserCart>(res)
    }
}

export default {
    mine,
    plus_or_edit
}



/*
const byuser = async (userid: number): Promise<UserCart> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'userId', userid)
    // __pm['filters[user][id][$eq]'] = userid
    const src: UserCart[] = await fetching(__pm, net_tool.__pager());
    return must_one(src[0])
}

const __plus = async (form: ONE): Promise<NET_RES> => {
    form['userId'] = authGetters.userid
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await app.pos('cart', null, __pm)
    return src
}

const __edit = async (form: ONE, id: string): Promise<UserCart> => {
    const __pm: ONE = net_tool.build_data(form)
    let src: NET_RES = await app.put('cart', id, __pm)
    if (is_str(src)) {
        src = await __plus(form)
    };
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserCart>(res)
} 
*/
