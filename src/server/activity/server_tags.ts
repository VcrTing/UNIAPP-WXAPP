import aiert_tooi from "@/tool/app/aiert_tooi"
import { master } from "@/tool/http/http"
import { is_arr, is_str } from "@/tool/util/typed"

const fetching = async (param: ONE = { }): Promise<ActivityTag[]> => {
    const src: NET_RES = await master.get('activity-tags', null, param)
    // if (is_str(src)) return aiert_tooi.err_r_one(src)
    const res: ONE | MANY = (src as HttpResult).data
    return is_arr(res) ? (res as ActivityTag[]) : [ ]
}

// 为首页
const index = async (param: ONE = { }): Promise<ActivityTag[]> => {
    return await fetching(param)
}

// 全部
const all = async (): Promise<ActivityTag[]> => {
    return await fetching({ })
}

export default {
    index,
    all
}