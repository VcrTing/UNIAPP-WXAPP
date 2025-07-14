import { BUSINESS } from "@/conf/conf-net";
import { business } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";
import { netser } from "@/tool/http/netser";
import { netip } from "@/tool/uni/uni-global";
import { is_str } from "@/tool/util/typed";

const plus = async (param: ONE): Promise<XOrder> => {
    const src: NET_RES = await netser(business.pos('checkout', 'add', param), BUSINESS)
    if (is_str(src)) return netip(src, <XOrder>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<XOrder>(res)
}

const checkout = async (order: XOrder): Promise<XOrder> => {
    const __pm: ONE = {
        ...order
    }
    const src: NET_RES = await netser(business.pos('checkout', 'pay', __pm), BUSINESS)
    if (is_str(src)) return netip(src, <XOrder>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<XOrder>(res)
}

export default {
    plus,
    checkout
}