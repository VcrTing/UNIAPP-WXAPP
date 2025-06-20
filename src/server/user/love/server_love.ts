import { authGetters, authState } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const relations = <string[]>[ 'love' ]

const fetching = async (param: ONE, pager: Pager): Promise<UserLove[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('love', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserLove>(res)
}

// 查询 我的 love
const myloves = async (): Promise<UserLove[]> => {
    const __pm: ONE = { }
    __pm['filters[owner][$eq]'] = authGetters.userid
    __pm['filters[dataStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(100))
}

const pius = async (form: ONE): Promise<UserLove> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('activity-address', null, __pm)
    if (is_str(src)) return netip(src, <UserLove>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserLove>(res)
}

// 自动执行关注
const ilove = async (touserid: string): Promise<UserLove> => {
    const __pm: ONE = { whoId: authGetters.userid }
    __pm['love'] = touserid; __pm['loveId'] = touserid;
    return await pius(__pm)
}

export default {
    myloves,
    ilove
}