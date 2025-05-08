import aiert_tooi from "@/tool/app/aiert_tooi"
import http from "@/tool/http/http"
import { is_arr, is_str } from "@/tool/util/typed"
import { is_nice_one } from "@/tool/util/valued"

const schemas = async (code: string = ''): MANY_PROMISE => {
    if (!code) {
        return aiert_tooi.err_r_many('报表CODE为空，本地没有拉取到该报表的信息')
    }

    const src: NET_RES = await http.master.get('report_schema', code, {  })
    if (is_str(src)) return aiert_tooi.err_r_many(src) 

    const res: ONE | MANY = (src as HttpResult).result
    if (is_nice_one(res)) {
        return aiert_tooi.err_r_many('报表结构的返回类型，必须是数组类型')
    }
    return is_arr(res) ? (res as MANY) : [ ]
}

export default {
    schemas
}