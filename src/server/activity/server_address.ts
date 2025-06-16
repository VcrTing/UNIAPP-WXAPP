import { authGetters } from "@/memory/global"
import aiert_tooi from "@/tool/app/aiert_tooi"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const fetching = async (param: ONE = { }): Promise<ActivityAddress[]> => {
    const src: NET_RES = await master.get('activity-address', null, param)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityAddress>(res)
}

// 为首页
const mine = async (param: ONE = { }): Promise<ActivityAddress[]> => {
    net_tool.limit_mine(param)
    return await fetching(param)
}

export default {
    mine
}