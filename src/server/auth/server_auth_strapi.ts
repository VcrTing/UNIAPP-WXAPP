

import { app } from "@/tool/http/http"
import { netip } from "@/tool/uni/uni-global"
import { is_str } from "@/tool/util/typed"
import { must_one } from "@/tool/util/valued"

/*
const login = async (data: ONE): ONE_PROMISE => {
    const res: NET_RES = await master.pos('login', null, data)
    if (is_str(res)) return aiert_tooi.err_r_one(res)
    return {} // (res as HttpResult).result
}
*/

const login = async (identifier: string, password: string): Promise<AuthResult> => {
    const pm = {
        identifier, password
    }
    const src: NET_RES = await app.pos('login', '', pm)
    if (is_str(src)) return netip(src, <AuthResult>{ });
    return must_one<AuthResult>(src as ONE)
}

export default {
    login
}