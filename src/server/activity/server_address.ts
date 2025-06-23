import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip, tiperr, tipwarn } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { formvtostr } from "@/tool/util/valued"

const relations: string[] = [ ]

const fetching = async (param: ONE = { }, pager: Pager): Promise<ActivityAddress[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('activity-address', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ActivityAddress>(res)
}

// 为首页
const mine = async (param: ONE = { }): Promise<ActivityAddress[]> => {
    net_tool.limit_mine(param)
    return await fetching(param, net_tool.generate_pagination())
}

// 查重复
const same = async (longitude: string, latitude: string): Promise<ActivityAddress[]> => {
    const __pm: ONE = { }
    net_tool.limit_mine(__pm)
    strapi_param_tool.__eq(__pm, 'longitude', longitude)
    strapi_param_tool.__eq(__pm, 'latitude', latitude)
    return await fetching(__pm, net_tool.generate_pagination())
}

// 新增
const plus = async (form: ONE = { }): Promise<ActivityAddress> => {
    
    form = formvtostr(form, [ 'longitude', 'latitude' ])
    // 查重复
    const sames: ActivityAddress[] = await same(form['longitude'], form['latitude'])
    //
    if (sames && sames.length > 0) {
        tipwarn('已存在相同的地址了');
        return <ActivityAddress>{ };
    }
    else {
        const __pm: ONE = net_tool.build_data(form)
        const src: NET_RES = await master.pos('activity-address', null, __pm)
        if (is_str(src)) return netip(src, <ActivityAddress>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ActivityAddress>(res)
    }
}

export default {
    mine, plus
}