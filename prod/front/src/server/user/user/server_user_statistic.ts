import { authGetters, authState, soState } from "@/memory/global"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_str } from "@/tool/util/typed"
import { cpu_fioat, cpu_int_1, must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<UserStatistic[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('statistic', null, __pm)
    if (is_str(src)) return netip(src, <UserStatistic[]>[]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<UserStatistic>(res)
}

const mine = async (param: ONE = { }): Promise<UserStatistic> => {
    // srp_p.__eq(param, 'user][id', userid)
    srp_p.__eq(param, 'userId', authGetters.userid)
    const src: UserStatistic[] = await fetching(param, net_tool.__pager());
    return must_one(src[0])
}

const byuser = async (userid: number): Promise<UserStatistic> => {
    const __pm: ONE = { }
    srp_p.__eq(__pm, 'userId', userid)
    // __pm['filters[user][id][$eq]'] = userid
    const src: UserStatistic[] = await fetching(__pm, net_tool.__pager());
    return must_one(src[0])
}

const __plus = async (form: ONE): Promise<NET_RES> => {
    form['userId'] = authGetters.userid
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await app.pos('statistic', null, __pm)
    return src
}

const __edit = async (form: ONE, id: string): Promise<UserStatistic> => {
    const __pm: ONE = net_tool.build_data(form)
    let src: NET_RES = await app.put('statistic', id, __pm)
    if (is_str(src)) {
        console.log('================== 修改一个用户统计数据，出错了。')
        src = await __plus(form)
    };
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserStatistic>(res)
} 

const __num = async (func: Function): Promise<UserStatistic> => {
    const mp: UserStatistic = must_one(soState.mainpage.statistic)
    if (mp.documentId) { return await func(mp) } return mp;
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


const __num_who = async (func: Function): Promise<UserStatistic> => {
    const mp: UserStatistic = must_one(soState.mainpage_of_view)
    if (mp.documentId) { return await func(mp) } return mp;
}
// 她人访问量
const num_she_visited = async (isadd: boolean = true): Promise<UserStatistic> => {
    return await __num_who(async (mp: UserStatistic) => {
        return await __edit({ nuwVisited: cpu_int_1(mp.nuwVisited, isadd) }, mp.documentId)
    })
}

export default {
    mine,
    byuser,
    num_publish,
    num_join,
    num_join_pay,

    num_she_visited
}