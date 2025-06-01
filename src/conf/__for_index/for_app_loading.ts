import { acyDispatch } from "@/memory/global"
import { promise } from "@/tool/util/future"

export const for_app_loading = () => promise(() => {
    acyDispatch('freshtags')
})