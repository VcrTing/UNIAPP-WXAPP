import { DEV_PAGER, DEV_TAG } from "@/conf/conf-dev"
import { STS_TAG } from "@/conf/conf-status"
import { uiGetters } from "@/memory/global"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const relations = <string[]> [ ]

const __fetching = async (param: ONE = { }, pager: Pager): Promise<Tag[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('tag', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Tag>(res)
}
const fetching = async (param: ONE = { }): Promise<Tag[]> => {
    srp_p.__eq(param, STS_TAG.LIVE.K, STS_TAG.LIVE.V)
    return await __fetching(param, net_tool.__pager_long())
}

// 为首页
const index = async (param: ONE = { }): Promise<Tag[]> => {
    const isphone: boolean = uiGetters.isphone
    const imit: number = isphone ? DEV_TAG.INDEX_LEVEL_LIMIT_PHONE : DEV_TAG.INDEX_LEVEL_LIMIT
    srp_p.__gt(param, 'indexLevel', imit)
    srp_p.__eq(param, 'isMain', 1)
    return await fetching(param)
}

// 全部
const all = async (param: ONE = { }): Promise<Tag[]> => {
    return await fetching(param)
}

export default {
    index,
    all
}