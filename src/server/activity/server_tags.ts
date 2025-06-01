import aiert_tooi from "@/tool/app/aiert_tooi"
import http from "@/tool/http/http"
import { is_arr, is_str } from "@/tool/util/typed"

// 为首页
const index = async (param: ONE = { }): Promise<ActivityTag[]> => {
    const src: NET_RES = await http.master.get('activity-tags', null, param)
    // if (is_str(src)) return aiert_tooi.err_r_one(src)
    const res: ONE | MANY = (src as HttpResult).data
    return is_arr(res) ? (res as ActivityTag[]) : [ ]
}

export default {
    index
}