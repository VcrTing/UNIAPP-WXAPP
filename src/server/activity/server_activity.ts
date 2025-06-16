import { DATA_IS_RECOMMEND } from "@/conf/conf-datas"
import { authGetters } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_medias', 'publisher', 'activity_tags' ]

const fetching = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('activity', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Activity>(res)
}

const index = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    return await fetching(param, pager)
}

const index_recommond = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    // 状态已审核
    strapi_param_tool.build_filter_in(param, 'dataStatus', [ 2 ])
    // 开启推荐
    param['filters[isRecommended][$eq]'] = DATA_IS_RECOMMEND // [ 'activity_address', 'activity_medias', 'publisher' ]
    return await index(param, pager)
}

export default {
    index,
    index_recommond
}