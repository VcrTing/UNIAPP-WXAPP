

import { app } from "@/tool/http/http"
import { error } from "@/tool/util/future"
import { is_str } from "@/tool/util/typed"
import { must_one } from "@/tool/util/valued"

const login = async (identifier: string, password: string): Promise<AuthResult> => {
    const pm = { identifier, password }
    const src: NET_RES = await app.pos('login', '', pm)
    if (is_str(src)) error(src + ' 系统内登录失败，赶紧联络管理员。')
    return must_one<AuthResult>(src as ONE)
}

export default {
    login
}