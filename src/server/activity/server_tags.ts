import aiert_tooi from "@/tool/app/aiert_tooi"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const fetching = async (param: ONE = { }): Promise<ActivityTag[]> => {
    const src: NET_RES = await master.get('activity-tags', null, param)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityTag>(res)
}

// 为首页
const index = async (param: ONE = { }): Promise<ActivityTag[]> => {
    param['filters[indexLevel][$gt]'] = 500
    param['filters[isMain][$eq]'] = 1
    param['filters[dataStatus][$eq]'] = 1
    return await fetching(param)
}

// 全部
const all = async (param: ONE = { }): Promise<ActivityTag[]> => {
    param['filters[dataStatus][$eq]'] = 1
    return await fetching(param)
}

export default {
    index,
    all
}