

import { DEV_COUNTRY_CODE_DEF } from "@/conf/conf-dev"
import { business } from "@/tool/http/http"
import { error } from "@/tool/util/future"
import { is_str } from "@/tool/util/typed"
import { must_one } from "@/tool/util/valued"

const login = async (identifier: string, password: string): Promise<AppAuth> => {
    const pm = { identifier, password, countryCode: DEV_COUNTRY_CODE_DEF }
    const src: NET_RES = await business.pos('login', '', pm)
    if (is_str(src)) error(src + ' 系统内登录失败，赶紧联络管理员。')
    return must_one<AppAuth>(src as ONE)
}

export default {
    login
}