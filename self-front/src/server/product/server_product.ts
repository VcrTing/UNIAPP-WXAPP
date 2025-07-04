import { DEV_DOC_ID, DEV_PRODUCT } from "@/conf/conf-dev"
import { STS_PRODUCT } from "@/conf/conf-status"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { cpu_int_1, must_arr, must_one } from "@/tool/util/valued"

const relations = [ 'medias', 'publisher' ]

const fetching = async (param: ONE, pager: Pager): Promise<Product[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('product', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Product>(res)
}

const index = async (param: ONE, pager: Pager): Promise<Product[]> => {
    // 审核通过的
    srp_p.__eq(param, STS_PRODUCT.REVIEW.K, STS_PRODUCT.REVIEW.YES)
    // 顺序问题
    srp_p.__sorts(param, DEV_PRODUCT.SORT.INDEX)
    return await fetching(param, pager)
}

const index_recommond = async (param: ONE, pager: Pager): Promise<Product[]> => {
    // 状态正常
    srp_p.build_filter_in(param, STS_PRODUCT.STATUS.K, [ STS_PRODUCT.STATUS.PASS ])
    return await index(param, pager)
}

// 根据ids
const byids = async (ids: string[]): Promise<Product[]> => {
    const param: ONE = { }
    // ID = 这些
    srp_p.build_filter_in(param, DEV_DOC_ID, ids || [ ])
    // 状态正常
    srp_p.build_filter_in(param, STS_PRODUCT.STATUS.K, [ STS_PRODUCT.STATUS.PASS ])
    // 审核通过的
    srp_p.__eq(param, STS_PRODUCT.REVIEW.K, STS_PRODUCT.REVIEW.YES)
    // 返回
    return await fetching(param, net_tool.__pager_long())
}

// 搜寻单个
const byid = async (docid: string): Promise<Product> => {
    const __ids: string[] = [ ]
    __ids.push( docid )
    const src: Product[] = must_arr(await byids(__ids))
    return must_one(src[0])
}

// 我的
const mine_history = async (): Promise<Product[]> => {
    const param: ONE = { }
    net_tool.limit_mine(param, 'publisher')
    const us: Product[] = await fetching(param, net_tool.__pager())
    return us
}

// 加以阅读量
/*
const view1 = async (one: Product): Promise<Product> => {
    return await server_pubplus.edit({
        viewCount: cpu_int_1(one.numView)
    }, one)
}
*/

export default {
    mine_history,
    byid,
    byids,
    index,
    index_recommond
}