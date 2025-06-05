import aiert_tooi from "@/tool/app/aiert_tooi"
import { is_str } from "@/tool/util/typed"
import { master } from "@/tool/http/http"

const login = async (data: ONE): ONE_PROMISE => {
    const res: NET_RES = await master.pos('login', null, data)
    if (is_str(res)) return aiert_tooi.err_r_one(res)
    return {} // (res as HttpResult).result
}

const test_tmieout = async () => {
    const res: any = await master.get('timeout', null, null)
    console.log("测试超时结果 = " + res)
}

export default {
    login,
    test_tmieout
}