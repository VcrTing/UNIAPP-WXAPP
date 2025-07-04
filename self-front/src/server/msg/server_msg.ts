import { authGetters } from "@/memory/global";
import { master } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import srp_p from "@/tool/strapi/srp_p";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";

const relations: string[] = [  ]

const fetching = async (param: ONE, pager: Pager): Promise<MsgSystem[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('msg', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<MsgSystem>(res)
}

//

// 消息
const mine = async (): Promise<MsgSystem[]> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'toId', authGetters.userid)
    // 已读排序
    srp_p.__sort(__pm, 'isRead', true)
    return await fetching(__pm, net_tool.__pager_long())
}

export default {
    mine
}