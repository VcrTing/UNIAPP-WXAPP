import { authGetters } from "@/memory/global"
import http from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { is_arr, is_str } from "@/tool/util/typed"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_address', 'activity_medias', 'publisher', 'activity_tags' ]

const fetching = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    const __pm: ONE = net_tool.build_strapi_param(param, pager, relations)
    const src: NET_RES = await http.master.get('activity', null, __pm)
    const res: ONE | MANY = (src as HttpResult).data
    return is_arr(res) ? (res as Activity[]) : [ ]
}

// 个人
const mine = async (param: ONE, pager: Pager, dataStatus: number = -1): Promise<Activity[]> => {
    const id: number = authGetters.userid || 0
    param['filters[publisher][id][$eq]'] = id
    // 状态筛选
    if (dataStatus != -1) { param['filters[dataStatus][$eq]'] = dataStatus }
    //
    return await fetching(param, pager)
}

// 上架中
const working = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.generate_pagination(999), 2)
}
// 待发布
const waiting = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.generate_pagination(999), 1)
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