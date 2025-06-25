import { authGetters } from "@/memory/global"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_sn, must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<ProductContent[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('content', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<ProductContent>(res)
}

// 根据ids
const by_activity_ids = async (ids: string[]): Promise<ProductContent[]> => {
    const param: ONE = { }
    // ID = 这些
    strapi_param_tool.build_filter_in(param, 'activityId', ids || [ ])
    // 状态已审核
    strapi_param_tool.__eq(param, 'dataStatus', 1)
    // 未关闭
    strapi_param_tool.__eq(param, 'isAllow', 1)
    // 返回
    return await fetching(param, net_tool.generate_pagination(999))
}

// 搜寻单个
const by_activity = async (one: Activity): Promise<ProductContent[]> => {
    return must_arr(await by_activity_ids([ one.documentId ]))
}

// 改动
const plus_or_edit = async (one: Activity, src: ProductContent, introduction: string, content: string): Promise<ProductContent> => {
    let docId: string = must_one<ProductContent>(src).documentId;
    console.log('SRC ID =', docId)
    const form: ONE = { introduction, content, activityId: one.documentId, publisherId: authGetters.userid }
    if (is_nice_sn(docId)) {
        // 修改
    }
    else {
        form['isAllow'] = 1
        form['dataStatus'] = 1
    }
    const __pm: ONE = net_tool.build_data( form )
    if (is_nice_sn(docId)) {
        // 修改
        const src: NET_RES = await master.put('content', docId, __pm)
        if (is_str(src)) return netip(src, <ProductContent>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductContent>(res)
    }
    else {
        const src: NET_RES = await master.pos('content', null, __pm)
        if (is_str(src)) return netip(src, <ProductContent>{ });
        const res: ONE | MANY = (src as HttpResult).data
        return net_tool.one<ProductContent>(res)
    }
}

export default {
    by_activity,
    plus_or_edit
}