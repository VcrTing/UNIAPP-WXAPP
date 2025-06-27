import { APP_GENERATE_DETAIL } from "@/conf/conf-app"
import { STS } from "@/conf/conf-status"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { must_one } from "@/tool/util/valued"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = <string[]>[ ]

const fetching = async (param: ONE, pager: Pager): Promise<AppInfo[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('app-info', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<AppInfo>(res)
}

// 搜索活动
const info = async (param: ONE = { }): Promise<AppInfo> => {
    srp_p.__eq(param, 'dataStatus', STS.YES)
    const infos: AppInfo[] = await fetching(param, net_tool.__pager(2))
    const info: AppInfo = must_one(infos[0])
    if (info && info.documentId) {
        return info
    }
    return APP_GENERATE_DETAIL
}

export default {
    info
}