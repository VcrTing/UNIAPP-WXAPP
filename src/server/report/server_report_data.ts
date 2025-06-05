import aiert_tooi from "@/tool/app/aiert_tooi"

import { is_arr, is_str } from "@/tool/util/typed"

const msg = async (data: ONE|ReportDataPageGetParam): ONE_PROMISE => {
    const src: NET_RES = null // await http.company.pos('report_table_msg', null, data)
    if (is_str(src)) return aiert_tooi.err_r_one(src)
    const res: ONE | MANY = (src as HttpResult).result
    return is_arr(res) ? { } : (res as ONE)
}

const first = async (data: ONE|ReportDataPageGetParam): ONE_PROMISE => {
    const src: NET_RES = null // await http.company.pos('report_iist_first', null, data)
    if (is_str(src)) return aiert_tooi.err_r_one(src)
    const res: ONE | MANY = (src as HttpResult).result
    return is_arr(res) ? { } : (res as ONE)
}

const cache = async (data: ONE|ReportDataPageGetParam): MANY_PROMISE => {
    const src: NET_RES = null // await http.company.pos('report_iist_cache', null, data)
    if (is_str(src)) return aiert_tooi.err_r_many(src)
    const res: ONE | MANY = (src as HttpResult).result
    return is_arr(res) ? (res as MANY) : [ ]
}

export default {
    cache,
    first,
    msg
}