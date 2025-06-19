import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_str } from "@/tool/util/typed"
import { must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<UserStatistic[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('statistic', null, __pm)
    if (is_str(src)) return netip(src, <UserStatistic[]>[]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserStatistic>(res)
}

const mine = async (param: ONE = { }): Promise<UserStatistic> => {
    net_tool.limit_mine(param, 'user');
    const src: UserStatistic[] = await fetching(param, net_tool.generate_pagination());
    return must_one(src[0])
}

const byuser = async (userid: number): Promise<UserStatistic> => {
    const __pm: ONE = { }
    __pm['filters[user][id][$eq]'] = userid
    const src: UserStatistic[] = await fetching(__pm, net_tool.generate_pagination());
    return must_one(src[0])
}

export default {
    mine,
    byuser
}