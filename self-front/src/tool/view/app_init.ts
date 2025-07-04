import { authGetters, authStore } from "@/memory/global"
import uniRouter from "../uni/uni-router"

export const must_login = () => {
    const is_login = authGetters.is_login
    if (!is_login) {
        uniRouter.gopg('login');
    }
}