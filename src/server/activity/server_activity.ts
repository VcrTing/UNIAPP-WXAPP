import { DATA_IS_RECOMMEND } from "@/conf/conf-datas"
import { authGetters } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { must_arr, must_one } from "@/tool/util/valued"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_medias', 'publisher', 'activity_tags', 'activity_registrations' ]

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

// 根据ids
const byids = async (ids: string[]): Promise<Activity[]> => {
    const param: ONE = { }
    // ID = 这些
    strapi_param_tool.build_filter_in(param, 'documentId', ids || [ ])
    // 状态已审核
    strapi_param_tool.build_filter_in(param, 'dataStatus', [ 2 ])
    // 返回
    return await fetching(param, net_tool.generate_pagination(999))
}

// 搜寻单个
const byid = async (docid: string): Promise<Activity> => {
    const __ids: string[] = [ ]
    __ids.push( docid )
    const src: Activity[] = must_arr(await byids(__ids))
    return must_one(src[0])
}

// 我的
const mine_history = async (): Promise<Activity[]> => {
    const param: ONE = { }
    net_tool.limit_mine(param)
    const us: Activity[] = await fetching(param, net_tool.generate_pagination())
    return us
}

export default {
    mine_history,
    byid,
    byids,
    index,
    index_recommond
}