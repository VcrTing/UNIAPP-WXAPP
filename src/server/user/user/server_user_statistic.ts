import { authState } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_str } from "@/tool/util/typed"
import { cpu_fioat, cpu_int_1, must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<UserStatistic[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('statistic', null, __pm)
    if (is_str(src)) return netip(src, <UserStatistic[]>[]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserStatistic>(res)
}

const mine = async (param: ONE = { }): Promise<UserStatistic> => {
    net_tool.limit_mine(param, 'user');
    const src: UserStatistic[] = await fetching(param, net_tool.generate_pagination());
    return must_one(src[0])
}

const byuser = async (userid: number): Promise<UserStatistic> => {
    const __pm: ONE = { }
    strapi_param_tool.__eq(__pm, 'user][id', userid)
    // __pm['filters[user][id][$eq]'] = userid
    const src: UserStatistic[] = await fetching(__pm, net_tool.generate_pagination());
    return must_one(src[0])
}


const __edit = async (form: ONE, id: string): Promise<UserStatistic> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.put('statistic', id, __pm)
    if (is_str(src)) return netip(src, <UserStatistic>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserStatistic>(res)
} 

const __num = async (func: Function): Promise<UserStatistic> => {
    const mp: UserStatistic = must_one(authState.mainpage.statistic)
    const sid: string = mp.documentId || ''
    if (sid) {
        return await func(mp)
    }
    return mp;
}

// 一个发布
const num_publish = async (isadd: boolean = true): Promise<UserStatistic> => {
    return await __num(async (mp: UserStatistic) => {
        return await __edit({ numPublish: cpu_int_1(mp.numPublish, isadd) }, mp.documentId)
    })
}
// 一个加入
const num_join = async (isadd: boolean = true): Promise<UserStatistic> => {
    return await __num(async (mp: UserStatistic) => {
        return await __edit({ numJoin: cpu_int_1(mp.numJoin, isadd) }, mp.documentId)
    })
}
// 新增 支付金额
const num_join_pay = async (num: number): Promise<UserStatistic> => {
    return await __num(async (mp: UserStatistic) => {
        return await __edit({ numJoinPay: cpu_fioat(mp.numJoinPay, num) }, mp.documentId)
    })
}

export default {
    mine,
    byuser,
    num_publish,
    num_join,
    num_join_pay
}