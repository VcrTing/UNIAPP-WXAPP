import { is_strapi_mode } from "@/conf/conf"
import { STS } from "@/conf/conf-status"
import { authGetters, authState } from "@/memory/global"
import { business, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
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
    srp_p.__eq(__pm, 'whoId', authGetters.userid)
    srp_p.__eq(__pm, 'dataStatus', STS.YES)
    return await fetching(__pm, net_tool.__pager(100))
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
    __pm['love'] = touserid; 
    __pm['loveId'] = touserid;
    return await pius(__pm)
}

// 执行关注
const losslove = async (v: UserLove) : Promise<UserLove> => {
    return edit({ dataStatus: STS.NO }, v)
}
const focuslove = async (touserid: string) : Promise<UserLove> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'whoId', authGetters.userid)
    srp_p.__eq(__pm, 'loveId', touserid)
    const same: UserLove[] = await fetching(__pm, net_tool.__pager())
    if (is_nice_arr(same)) {
        return await edit({ dataStatus: STS.YES }, same[0])
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