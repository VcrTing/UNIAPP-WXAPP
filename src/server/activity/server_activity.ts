import { DATA_ACTIVITY_TYPED_GK } from "@/conf/conf-datas"
import { DEV_DOC_ID, DEV_SM_ALLOW_SEARCH, DEV_STATUS_DEF } from "@/conf/conf-dev"
import { STS_ACTIVITY } from "@/conf/conf-status"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { must_arr, must_one } from "@/tool/util/valued"

// http://localhost:1337/api/activities?populate[publisher][fields]=*&filters[activity_tags][name][$eq]=原味

const relations = [ 'activity_medias', 'publisher', 'activity_tags', 'activity_registrations' ]

const fetching = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('activity', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Activity>(res)
}

const index = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    // 审核通过的
    srp_p.__eq(param, STS_ACTIVITY.REVIEW.K, STS_ACTIVITY.REVIEW.YES)
    return await fetching(param, pager)
}

const index_recommond = async (param: ONE, pager: Pager): Promise<Activity[]> => {
    // 状态已审核
    srp_p.build_filter_in(param, STS_ACTIVITY.STATUS.K, [ STS_ACTIVITY.STATUS.PASS ])
    // 开启推荐
    srp_p.__eq(param, STS_ACTIVITY.RECOMMEND.K, STS_ACTIVITY.RECOMMEND.YES)
    // 处理私密
    if (!DEV_SM_ALLOW_SEARCH) {
        srp_p.__eq(param, 'typed', DATA_ACTIVITY_TYPED_GK.v)
    }
    return await index(param, pager)
}

// 根据ids
const byids = async (ids: string[]): Promise<Activity[]> => {
    const param: ONE = { }
    // ID = 这些
    srp_p.build_filter_in(param, DEV_DOC_ID, ids || [ ])
    // 状态已审核
    srp_p.build_filter_in(param, STS_ACTIVITY.STATUS.K, [ STS_ACTIVITY.STATUS.PASS ])
    // 审核通过的
    srp_p.__eq(param, STS_ACTIVITY.REVIEW.K, STS_ACTIVITY.REVIEW.YES)
    // 返回
    return await fetching(param, net_tool.__pager_long())
}

// 搜寻单个
const byid = async (docid: string): Promise<Activity> => {
    const __ids: string[] = [ ]
    __ids.push( docid )
    const src: Activity[] = must_arr(await byids(__ids))
    return must_one(src[0])
}

// 我的
const mine_history = async (): Promise<Activity[]> => {
    const param: ONE = { }
    net_tool.limit_mine(param)
    const us: Activity[] = await fetching(param, net_tool.__pager())
    return us
}

export default {
    mine_history,
    byid,
    byids,
    index,
    index_recommond
}