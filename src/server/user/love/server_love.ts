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
    return net_tool.many<UserLove>(src as ONE)
}

const myloves = async (): Promise<UserLove[]> => {
    const __pm: ONE = { }
    __pm['filters[owner][$eq]'] = authGetters.userid
    __pm['filters[dataStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(100))
}

export default {
    myloves
}