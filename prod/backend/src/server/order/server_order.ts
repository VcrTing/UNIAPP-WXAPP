import { DEV_ORDER } from "@/conf/conf-dev"
import { STS_ORDER, STS_TAG } from "@/conf/conf-status"
import { authGetters } from "@/memory/global"
import { app, business } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const relations = <string[]> [ ]

const __fetching = async (param: ONE = { }, pager: Pager): Promise<XOrder[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await business.get('order', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<XOrder>(res)
}
const fetching = async (param: ONE = { }, pager: Pager = net_tool.__pager_long()): Promise<XOrder[]> => {
    // 存活
    srp_p.__eq(param, STS_ORDER.STATUS.K, STS_ORDER.STATUS.YES)
    // 有锁的
    srp_p.__eq(param, STS_ORDER.LOCK.K, STS_ORDER.LOCK.YES)
    return await __fetching(param, pager)
}

// 全部
const all = async (param: ONE = { }): Promise<XOrder[]> => {
    return await fetching(param)
}

// 个人
const mine = async (param: ONE, pager: Pager): Promise<XOrder[]> => {
    srp_p.__eq(param, 'userDocumentId', authGetters.user_doc_id)
    srp_p.__sorts(param, DEV_ORDER.SORT.DEF)
    return await fetching(param, pager)
}

export default {
    all,
    mine
}