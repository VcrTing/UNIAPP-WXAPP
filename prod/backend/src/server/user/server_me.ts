import { authGetters, authState } from "@/memory/global"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"


const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<User[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('user', null, __pm)
    return net_tool.many<User>(src as ONE)
}

const one = async (id: string | number): Promise<User> => {
    const src: NET_RES = await app.get('user', id + '', { })
    // const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<User>(src as ONE)
}

const info = async () => {
    const id = authGetters.userid;
    return one(id)
}

const change_avatar = async (avatarUrl: string): Promise<User> => {
    const id: string = authState.user.id + ''
    const src: NET_RES = await app.put('user', id, { avatarUrl })
    if (is_str(src)) return netip(src, <User>{ });
    return net_tool.one<User>(src as ONE)
}
const change_background = async (background: string): Promise<User> => {
    const id: string = authState.user.id + ''
    const src: NET_RES = await app.put('user', id, { background })
    if (is_str(src)) return netip(src, <User>{ });
    return net_tool.one<User>(src as ONE)
}

export default {
    one,
    info,
    change_avatar,
    change_background
}