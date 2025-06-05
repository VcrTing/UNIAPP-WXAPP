import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { is_arr, is_str } from "@/tool/util/typed"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_medias', 'publisher', 'activity_tags' ]

const fetching = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('activity', null, __pm)
    const res: ONE | MANY = (src as HttpResult).data
    return is_arr(res) ? (res as Activity[]) : [ ]
}

// 个人
const mine = async (param: ONE, pager: Pager, dataStatus: number[] = []): Promise<Activity[]> => {
    net_tool.limit_mine(param, 'publisher')
    // 状态筛选
    if (dataStatus.length) { 
        strapi_param_tool.build_filter_in(param, 'dataStatus', dataStatus)
    }
    //
    return await fetching(param, pager)
}

// 上架中
const working = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.generate_pagination(999), [ 2 ])
}
// 待发布
const waiting = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.generate_pagination(999), [ 0, 1 ])
}

// 历史
const history = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.generate_pagination(999))
}

export default {
    working,
    waiting,
    history
}