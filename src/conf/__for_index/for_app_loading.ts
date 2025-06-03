import { pageIndexDispatch } from "@/memory/page"
import { promise } from "@/tool/util/future"
import { DATA_CITY_DEF } from "../conf-datas"

export const for_app_loading = () => promise(() => {
    // 加载标签
    pageIndexDispatch('freshtags')
    // 加载城市
    pageIndexDispatch('change', [ 'city', DATA_CITY_DEF ])
})