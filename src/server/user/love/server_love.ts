import { is_strapi_mode } from "@/conf/conf"
import { authGetters, authState } from "@/memory/global"
import { business, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_arr } from "@/tool/util/valued"

const relations = <string[]>[ 'love' ]

const fetching = async (param: ONE, pager: Pager): Promise<UserLove[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await business.get('love', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserLove>(res)
}

// 查询 我的 love
const myloves = async (): Promise<UserLove[]> => {
    const __pm: ONE = { }
    __pm['filters[whoId][$eq]'] = authGetters.userid
    __pm['filters[dataStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(100))
}

const pius = async (form: ONE): Promise<UserLove> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await business.pos('love', null, __pm)
    if (is_str(src)) return netip(src, <UserLove>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserLove>(res)
}
const edit = async (form: ONE, origin: UserLove): Promise<UserLove> => {
    const id: string = is_strapi_mode() ? origin['documentId'] : (origin['id'] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await business.put('love', id, __pm)
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

// 执行关注
const losslove = async (v: UserLove) : Promise<UserLove> => {
    return edit({ dataStatus: 0 }, v)
}
const focuslove = async (touserid: string) : Promise<UserLove> => {
    const __pm: ONE = { }
    strapi_param_tool.__eq(__pm, 'whoId', authGetters.userid)
    strapi_param_tool.__eq(__pm, 'loveId', touserid)
    const same: UserLove[] = await fetching(__pm, net_tool.generate_pagination())
    if (is_nice_arr(same)) {
        return await edit({ dataStatus: 1 }, same[0])
    }
    else {
        return await ilove(touserid)
    }
}

export default {
    myloves,
    ilove,
    losslove,
    focuslove
}