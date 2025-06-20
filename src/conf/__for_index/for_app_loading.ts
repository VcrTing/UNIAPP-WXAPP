import { pageIndexDispatch } from "@/memory/page"
import { promise } from "@/tool/util/future"
import { DATA_CITY_DEF } from "../conf-datas"
import { authDispatch, uiDispatch } from "@/memory/global"

export const for_app_loading = () => promise(() => {
    // 加载标签
    pageIndexDispatch('freshtags')
    // 加载城市
    pageIndexDispatch('change', [ 'city', DATA_CITY_DEF ])
    // 加载屏幕宽高
    uiDispatch('asyncwh')
    // 加载用户数据
    authDispatch('refresh_info')
})