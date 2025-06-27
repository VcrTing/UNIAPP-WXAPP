import { master } from "@/tool/http/http"
import server_user from "../user/user/server_user"

/*
const login = async (data: ONE): ONE_PROMISE => {
    const res: NET_RES = await master.pos('login', null, data)
    if (is_str(res)) return aiert_tooi.err_r_one(res)
    return {} // (res as HttpResult).result
}
    */

const login = async (phonedata: AppPhoneWX): Promise<AppAuth | null> => {
    const user: User = await server_user.byphone(phonedata.phoneNumber)
    if (user && user.id) {
        return <AppAuth>{
            jwt: user.documentId,
            user,
            phonedata
        }
    }
    return null
}

const test_tmieout = async () => {
    const res: any = await master.get('timeout', null, null)
    console.log("测试超时结果 = " + res)
}

export default {
    login,
    test_tmieout
}