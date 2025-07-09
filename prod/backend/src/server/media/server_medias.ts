import { is_strapi_mode } from "@/conf/conf"
import { DEV_DOC_ID, DEV_ID } from "@/conf/conf-dev"
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


const edit = async (form: ONE, origin: ONE): Promise<Media> => {
    const id: string = is_strapi_mode() ? origin[DEV_DOC_ID] : (origin[DEV_ID] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await app.put('media', id, __pm)
    if (is_str(src)) return netip(src, <Media>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Media>(res)
} 

// 标注色情
const sex = async (v: Media): Promise<Media> => {
    return await edit({ isSex: 1 }, v)
}

export default {
    sex, mainpage
}