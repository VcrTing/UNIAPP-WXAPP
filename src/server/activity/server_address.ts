import { authGetters } from "@/memory/global"
import aiert_tooi from "@/tool/app/aiert_tooi"
import http from "@/tool/http/http"
import { is_arr, is_str } from "@/tool/util/typed"

const fetching = async (param: ONE = { }): Promise<ActivityAddress[]> => {
    const src: NET_RES = await http.master.get('activity-address', null, param)
    // if (is_str(src)) return aiert_tooi.err_r_one(src)
    const res: ONE | MANY = (src as HttpResult).data
    return is_arr(res) ? (res as ActivityAddress[]) : [ ]
}

// 为首页
const mine = async (param: ONE = { }): Promise<ActivityAddress[]> => {
    const id: number = authGetters.userid || 0
    param['filters[user][id][$eq]'] = id
    return await fetching(param)
}

export default {
    mine
}