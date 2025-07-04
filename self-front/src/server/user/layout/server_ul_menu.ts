import aiert_tooi from "@/tool/app/aiert_tooi"
import { master } from "@/tool/http/http"
import { is_arr, is_str } from "@/tool/util/typed"

const menus = async (username: string = ''): ONE_PROMISE => {
    if (!username) {
        return aiert_tooi.err_r_one('用户名为空，没有用户的登录信息') 
    }

    const src: NET_RES = await master.get('user_layout_menu', username, {  })
    if (is_str(src)) return aiert_tooi.err_r_one(src) 

    const res: ONE | MANY = (src as HttpResult).result
    if (is_arr(res)) {
        return aiert_tooi.err_r_one('首页菜单接口的返回结果，必须是对象类型') 
    }
    return (res as ONE)
}

export default {
    menus
}