import { authGetters } from "@/memory/global";
import { master } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";


const join = async (form: ONE): Promise<ActivityJoin> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('join', null, __pm)
    if (is_str(src)) return netip(src, <ActivityJoin>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<ActivityJoin>(res)
}

const relations: string[] = [ 'activity', 'user' ]

const fetching = async (param: ONE, pager: Pager): Promise<ActivityJoin[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('join', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityJoin>(res)
}

const join_of_mine = async (): Promise<ActivityJoin[]> => {
    const userid: string = authGetters.userid;
    const __pm: ONE = { }
    __pm['filters[user][$eq]'] = userid
    __pm['filters[overStatus][$eq]'] = 0
    __pm['filters[safeStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(999))
}

const join_of_activity = async (actid: string): Promise<ActivityJoin[]> => {
    // const userid: string = authGetters.userid;
    const __pm: ONE = { }
    __pm['filters[activity][documentId][$eq]'] = actid
    __pm['filters[safeStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(99))
}

// 参与历史
const join_history = async (): Promise<ActivityJoin[]> => {
    const __pm: ONE = { }
    __pm['filters[user][$eq]'] = authGetters.userid
    // __pm['filters[safeStatus][$eq]'] = 1
    return await fetching(__pm, net_tool.generate_pagination(999))
}

// 金钱
const join_for_money = async (): Promise<ActivityJoin[]> => {
    return await join_history()
}

export default {
    join,
    join_history,
    join_of_mine,
    join_for_money,
    join_of_activity
}