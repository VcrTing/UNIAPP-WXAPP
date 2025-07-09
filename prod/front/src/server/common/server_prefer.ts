import { authGetters } from "@/memory/global"
import { app, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_sn, must_arr, must_int, must_one } from "@/tool/util/valued"

const relations = <string[]>[ ]

const __fetching = async (param: ONE, pager: Pager): Promise<TagPrefer[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('prefer', null, __pm)
    if (is_str(src)) return [];
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<TagPrefer>(res)
}
const fetching = async (param: ONE, pager: Pager): Promise<TagPrefer[]> => {
    srp_p.__eq(param, 'userId', authGetters.userid)
    //
    return __fetching(param, pager)
}

// 单个
const one = async (p: Tag): Promise<TagPrefer> => {
    const pm: ONE = { }
    srp_p.__eq(pm, 'tagId', p.documentId)
    const src: TagPrefer[] = await fetching(pm, net_tool.__pager())
    return must_one(src[0])
}

// 多个
const mine = async (): Promise<TagPrefer[]> => {
    const pm: ONE = { }
    srp_p.__eq(pm, 'userId', authGetters.userid)
    return await fetching(pm, net_tool.__pager_long())
}

// 改动
const plus_or_edit = async (one: Tag, src: TagPrefer, ks: string[]): Promise<TagPrefer> => {
    let docId: string = must_one<TagPrefer>(src).documentId;
    const form: TagPrefer | ONE = { tagId: one.documentId, userId: authGetters.userid + '' }
    if (is_nice_sn(docId)) {
        // 修改
        ks.map(k => {
            form[ k ] = must_int((src as ONE)[ k ]) + 1
        })
    }
    else {
        ks.map(k => {
            form[ k ] = 1
        })
    }
    const __pm: ONE = net_tool.build_data( form )
    if (is_nice_sn(docId)) {
        // 修改
        const src: NET_RES = await app.put('prefer', docId, __pm)
        if (is_str(src)) return netip(src, <TagPrefer>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<TagPrefer>(res)
    }
    else {
        const src: NET_RES = await app.pos('prefer', null, __pm)
        if (is_str(src)) return netip(src, <TagPrefer>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<TagPrefer>(res)
    }
}

export default {
    one,
    mine,
    fetching,
    plus_or_edit
}