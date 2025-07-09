import { DATA_ACTIVITY_TYPED_GK, DATA_PRODUCT_TYPED_SM } from "@/conf/conf-datas"
import { DEV_PRODUCT } from "@/conf/conf-dev"
import { authGetters } from "@/memory/global"
import { app, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_sn, must_arr, must_int, must_one } from "@/tool/util/valued"

const relations = <string[]>[ ]

const __fetching = async (param: ONE, pager: Pager): Promise<ProductVisual[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('visual', null, __pm)
    if (is_str(src)) return [];
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ProductVisual>(res)
}
const fetching = async (param: ONE, pager: Pager): Promise<ProductVisual[]> => {
    srp_p.__eq(param, 'userId', authGetters.userid)
    //
    return __fetching(param, pager)
}

const mine = async (param: ONE, typed: number, pager: Pager): Promise<ProductVisual[]> => {
    if (typed === DATA_PRODUCT_TYPED_SM.v) {
        srp_p.__eq(param, 'typed', DEV_PRODUCT.TYPED.SM)
    }
    else if (typed === DATA_ACTIVITY_TYPED_GK.v) {
        srp_p.__eq(param, 'typed', DEV_PRODUCT.TYPED.FREE)
    }
    srp_p.__eq(param, 'userId', authGetters.userid)
    //
    return __fetching(param, pager)
}

// 单个
const one = async (p: Product): Promise<ProductVisual> => {
    const pm: ONE = { }
    srp_p.__eq(pm, 'productId', p.documentId)
    const src: ProductVisual[] = await fetching(pm, net_tool.__pager())
    return must_one(src[0])
}

// 改动
const plus_or_edit = async (one: Product, src: ProductVisual): Promise<ProductVisual> => {
    let docId: string = must_one<ProductVisual>(src).documentId;
    const form: ProductVisual | ONE = { 
        productId: one.documentId, userId: authGetters.userid + '',
        typed: one.typed
    }
    if (is_nice_sn(docId)) {
        // 修改
        form['num'] = must_int(src.num) + 1
    }
    else {
        form['num'] = 1
    }
    const __pm: ONE = net_tool.build_data( form )
    if (is_nice_sn(docId)) {
        // 修改
        const src: NET_RES = await app.put('visual', docId, __pm)
        if (is_str(src)) return netip(src, <ProductVisual>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductVisual>(res)
    }
    else {
        const src: NET_RES = await app.pos('visual', null, __pm)
        if (is_str(src)) return netip(src, <ProductVisual>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductVisual>(res)
    }
}

export default {
    one,
    mine,
    fetching,
    plus_or_edit
}