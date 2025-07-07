import { DEV_PRODUCT } from "@/conf/conf-dev"
import { STS_PRODUCT } from "@/conf/conf-status"
import { app, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"


const relations = [ 'medias', 'tags', 'honours', 'user' ]

const fetching = async (param: ONE, pager: Pager): Promise<Product[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('product', null, __pm)
    if (is_str(src)) return netip(src, [ ]);
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.many<Product>(res)
}

// 个人
const mine = async (param: ONE, pager: Pager, sts: number[] = []): Promise<Product[]> => {
    net_tool.limit_mine(param, 'user')
    // 状态筛选
    if (sts.length) { 
        srp_p.build_filter_in(param, STS_PRODUCT.STATUS.K, sts)
    }
    //
    return await fetching(param, pager)
}

// 上架中
const working = async (param: ONE): Promise<Product[]> => {
    return await mine(param, net_tool.__pager_long(), [ STS_PRODUCT.STATUS.PASS ])
}
// 待发布
const waiting = async (param: ONE): Promise<Product[]> => {
    return await mine(param, net_tool.__pager_long(), [ STS_PRODUCT.STATUS.EDITING, STS_PRODUCT.STATUS.CHECKING ])
}

// 历史
const history = async (param: ONE): Promise<Product[]> => {
    return await mine(param, net_tool.__pager_long())
}

// 下架中
const takeoff = async (param: ONE): Promise<Product[]> => {
    return await mine(param, net_tool.__pager_long(), [ STS_PRODUCT.STATUS.OFF ])
}

const mineAii = async (param: ONE): Promise<Product[]> => {
    srp_p.__eq(param, 'typed', DEV_PRODUCT.TYPED.SM)
    // 状态筛选
    srp_p.build_filter_in(param, STS_PRODUCT.STATUS.K, [ STS_PRODUCT.STATUS.OFF, STS_PRODUCT.STATUS.NICE, STS_PRODUCT.STATUS.PASS ])
    //
    return await fetching(param, net_tool.__pager_long())
}

export default {
    mineAii,

    working,
    waiting,
    history,
    takeoff
}