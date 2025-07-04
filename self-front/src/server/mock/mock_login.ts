import { authState } from "@/memory/global"
import { has_document } from "@/tool/web/doc"

export default {
    gettoken: (): ONE | null => {
        return has_document() ? { errMsg: "login:ok", code: "the code is a mock one" } : null
    },
    getphone_bycode: (successFun: Function) => {
        const src: AppPhoneWX = authState.__unreal;
        setTimeout(() => {
            const data = src.phoneNumber ? src : <AppPhoneWX>{
                countryCode: '86',
                phoneNumber: '13576639986',
                purePhoneNumber: '13576639986'
            }

            if (successFun) successFun(data)
        }, 300)
    }
}