import { authGetters, authState, soState } from "@/memory/global"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import product_build_tool from "@/tool/modules/func/product_build_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_str } from "@/tool/util/typed"
import { cpu_fioat, cpu_int_1, must_arr, must_int, must_one } from "@/tool/util/valued"

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

const __plus = async (form: ONE, uid: number): Promise<NET_RES> => {
    form['userId'] = uid + ''; // authGetters.userid
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await app.pos('statistic', null, __pm)
    return src
}

const __edit = async (form: ONE, staticDocId: string, uid: number): Promise<UserStatistic> => {
    const __pm: ONE = net_tool.build_data(form)
    let src: NET_RES = await app.put('statistic', staticDocId, __pm)
    if (is_str(src)) {
        // console.log('================== 修改一个用户统计数据，出错了。')
        src = await __plus(form, uid)
    };
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<UserStatistic>(res)
} 
/*
const __num = async (func: Function): Promise<UserStatistic> => {
    const mp: UserMainPage = soState.mainpage || { }
    const us: UserStatistic = must_one(mp.statistic)
    // console.log('__num statistic =', us)
    const uid: number = must_int(mp.id)
    if (us.documentId) { return await func(us, uid == 0 ? authGetters.userid : uid) } return us;
}
*/

// 一个发布
const num_publish = async (isadd: boolean = true): Promise<UserStatistic> => {
    const us: UserStatistic = must_one((soState.mainpage || { }).statistic)
    const pm: ONE = { numPublish: cpu_int_1(us.numPublish, isadd) }
    return await __edit(pm, us.documentId, authGetters.userid)
}

// 她人访问量
const num_she_visited = async (us: UserStatistic, userid: number): Promise<UserStatistic> => {
    try {
    console.log('num_she_visited statistic =', us)
        return await __edit(product_build_tool.form_add_she_visited_num(us), us.documentId, userid)
    }
    catch( err ) { return <UserStatistic>{ } }
}

export default {
    mine,
    byuser,
    num_publish,
    num_she_visited
}
// 一个加入
/*

    num_join,
    num_join_pay,

const num_join = async (isadd: boolean = true): Promise<UserStatistic> => {
    return await __num(async (mp: UserStatistic, uid: number) => {
        return await __edit({ numJoin: cpu_int_1(mp.numJoin, isadd) }, mp.documentId, uid)
    })
}
// 新增 支付金额
const num_join_pay = async (num: number): Promise<UserStatistic> => {
    return await __num(async (mp: UserStatistic, uid: number) => {
        return await __edit({ numJoinPay: cpu_fioat(mp.numJoinPay, num) }, mp.documentId, uid)
    })
}
*/
/*
const __num_who = async (func: Function): Promise<UserStatistic> => {
    const mp: UserStatistic = must_one(soState.mainpage_of_view)
    console.log('B =', mp.documentId)
    if (mp.documentId) { return await func(mp) } return mp;
}
*/