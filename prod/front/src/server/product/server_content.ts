import { STS_CONTENT } from "@/conf/conf-status"
import { authGetters } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_sn, must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[ 'galleries' ]

const __fetching = async (param: ONE, pager: Pager): Promise<ProductContent[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('content', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ProductContent>(res)
}
const fetching = async (param: ONE, pager: Pager): Promise<ProductContent[]> => {
    // 状态已审核
    srp_p.__eq(param, STS_CONTENT.STATUS.K, STS_CONTENT.STATUS.PASS)
    // 未关闭
    srp_p.__eq(param, STS_CONTENT.ALLOW.K, STS_CONTENT.ALLOW.YES)
    //
    return __fetching(param, pager)
}

// 根据ids
const by_product_ids = async (ids: string[]): Promise<ProductContent[]> => {
    const param: ONE = { }
    // ID = 这些
    srp_p.build_filter_in(param, 'belongId', ids || [ ])
    // 返回
    return await fetching(param, net_tool.__pager_long())
}

// 搜寻单个
const by_product = async (one: Product): Promise<ProductContent[]> => {
    const param: ONE = { }
    // ID = 这些
    srp_p.__eq(param, 'belongId', one.documentId)
    // 返回
    return await fetching(param, net_tool.__pager_long())
}

// 改动
const plus_or_edit = async (one: Activity, src: ProductContent, introduction: string, content: string): Promise<ProductContent> => {
    let docId: string = must_one<ProductContent>(src).documentId;
    const form: ONE = { introduction, content, activityId: one.documentId, publisherId: authGetters.userid }
    if (is_nice_sn(docId)) {
        // 修改
    }
    else {
        form[STS_CONTENT.ALLOW.K] = STS_CONTENT.ALLOW.YES
        form[STS_CONTENT.STATUS.K] = STS_CONTENT.STATUS.PASS
    }
    const __pm: ONE = net_tool.build_data( form )
    if (is_nice_sn(docId)) {
        // 修改
        const src: NET_RES = await master.put('content', docId, __pm)
        if (is_str(src)) return netip(src, <ProductContent>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductContent>(res)
    }
    else {
        const src: NET_RES = await master.pos('content', null, __pm)
        if (is_str(src)) return netip(src, <ProductContent>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductContent>(res)
    }
}

export default {
    by_product,
    plus_or_edit
}