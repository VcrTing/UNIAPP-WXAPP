import aiert_tooi from "@/tool/app/aiert_tooi"
import http from "@/tool/http/http"
import { is_str } from "@/tool/util/typed"

const login = async (data: ONE): ONE_PROMISE => {
    const res: NET_RES = await http.master.pos('login', null, data)
    if (is_str(res)) return aiert_tooi.err_r_one(res)
    return (res as HttpResult).result
}

const test_tmieout = async () => {
    const res: any = await http.master.get('timeout', null, null)
    console.log("测试超时结果 = " + res)
}

export default {
    login,
    test_tmieout
}