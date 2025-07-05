import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"


const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<Media[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('media', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Media>(res as ONE)
}

const mainpage = async (userid: string): Promise<Media[]> => {
    return await fetching({ }, net_tool.__pager(24))
}

export default {
    mainpage
}