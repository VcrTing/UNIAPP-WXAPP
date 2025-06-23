import { master } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";

const relations: string[] = [ 'invite_user' ]

const fetching = async (param: ONE, pager: Pager): Promise<ActivityInvite[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('invite', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityInvite>(res)
}

// 消息
const invites = async (): Promise<ActivityInvite[]> => {

    return [ ]
}

export default {
    invites
}