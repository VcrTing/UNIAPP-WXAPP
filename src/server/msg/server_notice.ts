import { master } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import srp_p from "@/tool/strapi/srp_p";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";

const relations: string[] = [  ]

const fetching = async (param: ONE, pager: Pager): Promise<ActivityNotice[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('notice', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityNotice>(res)
}

const by_activity = async (one: Activity): Promise<ActivityNotice[]> => {
    const activityId: string = one.documentId
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'activityId', activityId)
    srp_p.__sort(__pm)
    return await fetching(__pm, net_tool.generate_pagination())
}

const plus = async (form: ONE): Promise<ActivityNotice> => {
    const __pm: ONE = net_tool.build_data({ title: form.title, content: form.content, isTop: 1 })
    const src: NET_RES = await master.pos('notice', null, __pm)
    if (is_str(src)) return netip(src, <ActivityNotice>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<ActivityNotice>(res)
}

const edit = async (docid: string, title: string, content: string): Promise<ActivityNotice> => {
    const __pm: ONE = net_tool.build_data({ title, content })
    const src: NET_RES = await master.put('notice', docid, __pm)
    if (is_str(src)) return netip(src, <ActivityNotice>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<ActivityNotice>(res)
}

export default {
    plus,
    edit,
    by_activity
}