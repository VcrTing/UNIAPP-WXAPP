import { DATA_ACTIVITY_TYPED_GK } from "@/conf/conf-datas"
import { DEV_ACTIVITY } from "@/conf/conf-dev"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations_of_items = <string[]>[ 'medias' ]

const fetching = async (param: ONE, pager: Pager): Promise<Product[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations_of_items)
    const src: NET_RES = await app.get('product', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Product>(res)
}

// 搜索活动
const search = async (search: string, param: ONE = { }, pager: Pager = net_tool.__pager()): Promise<Product[]> => {
    srp_p.__like(param, 'search', search)
    srp_p.__sort(param)
    /*
    // 处理私密
    if (!DEV_ACTIVITY.ALLOW_SEARCH_SM) {
        srp_p.__eq(param, 'typed', DATA_ACTIVITY_TYPED_GK.v)
    }
    */
    return await fetching(param, pager)
}

export default {
    search
}