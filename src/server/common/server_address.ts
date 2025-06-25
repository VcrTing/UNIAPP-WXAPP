import { authGetters } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip, tiperr, tipwarn } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { formvtostr } from "@/tool/util/valued"

const relations: string[] = [ ]

const fetching = async (param: ONE = { }, pager: Pager): Promise<Address[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('address', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Address>(res)
}

// 为首页
const mine = async (param: ONE = { }): Promise<Address[]> => {
    srp_p.__eq(param, 'publisherId', authGetters.userid)
    return await fetching(param, net_tool.generate_pagination())
}

// 查重复
const same = async (longitude: string, latitude: string): Promise<Address[]> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'publisherId', authGetters.userid)
    srp_p.__eq(__pm, 'longitude', longitude)
    srp_p.__eq(__pm, 'latitude', latitude)
    return await fetching(__pm, net_tool.generate_pagination())
}

// 新增
const plus = async (form: ONE = { }): Promise<Address> => {
    
    form = formvtostr(form, [ 'longitude', 'latitude' ])
    // 查重复
    const sames: Address[] = await same(form['longitude'], form['latitude'])
    //
    if (sames && sames.length > 0) {
        tipwarn('已存在相同的地址了');
        return <Address>{ };
    }
    else {
        const __pm: ONE = net_tool.build_data(form)
        const src: NET_RES = await master.pos('address', null, __pm)
        if (is_str(src)) return netip(src, <Address>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<Address>(res)
    }
}

export default {
    mine, plus
}