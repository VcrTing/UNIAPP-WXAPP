import { authGetters, authState } from "@/memory/global";
import { master } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import srp_p from "@/tool/strapi/srp_p";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";
import times from "@/tool/web/times";

const relations: string[] = [ 'invite_user' ]

const fetching = async (param: ONE, pager: Pager): Promise<ActivityInvite[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('invite', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityInvite>(res)
}

const plus = async (one: Activity, invite_user: User): Promise<ActivityInvite> => {
    const form: ActivityInvite | ONE = {
        invite_user: invite_user.id, activityId: one.documentId, publisherId: authGetters.userid,
        inviteUserId: invite_user.id,
        inviteTime: times.fmts(new Date()), agreeStatus: 0, readNum: 0 
    }
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('invite', null, __pm)
    if (is_str(src)) return netip(src, <ActivityInvite>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<ActivityInvite>(res)
}

const byactivity = async (activityId: string): Promise<ActivityInvite[]> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'activityId', activityId)
    const src: ActivityInvite[] = await fetching(__pm, net_tool.__pager());
    return src
}

export default {
    plus,
    byactivity
}