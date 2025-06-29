import { STS_ACTIVITY } from "@/conf/conf-status"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_medias', 'publisher', 'activity_tags', 'activity_address' ]

const fetching = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('activity', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Activity>(res)
}

// 个人
const mine = async (param: ONE, pager: Pager, sts: number[] = []): Promise<Activity[]> => {
    net_tool.limit_mine(param, 'publisher')
    // 状态筛选
    if (sts.length) { 
        srp_p.build_filter_in(param, STS_ACTIVITY.STATUS.K, sts)
    }
    //
    return await fetching(param, pager)
}

// 上架中
const working = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.__pager_long(), [ STS_ACTIVITY.STATUS.PASS ])
}
// 待发布
const waiting = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.__pager_long(), [ STS_ACTIVITY.STATUS.EDITING, STS_ACTIVITY.STATUS.CHECKING ])
}

// 历史
const history = async (param: ONE): Promise<Activity[]> => {
    return await mine(param, net_tool.__pager_long())
}

export default {
    working,
    waiting,
    history
}