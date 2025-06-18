import { authGetters, authState } from "@/memory/global"
import { pageIndexState } from "@/memory/page"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"


const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<ActivityMedia[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('activity-media', null, __pm)
    return net_tool.many<ActivityMedia>(src as ONE)
}

const mainpage = async (userid: string): Promise<ActivityMedia[]> => {
    return await fetching({ }, net_tool.generate_pagination(24))
}

export default {
    mainpage
}