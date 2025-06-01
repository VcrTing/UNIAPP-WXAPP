import { has_document } from "@/tool/web/doc"

export default {
    gettoken: (): ONE | null => {
        return has_document() ? { errMsg: "login:ok", code: "the code is a mock one" } : null
    },
    getphonebycode: (successFun: Function) => {
        setTimeout(() => {
            const data = {
                countryCode: '86',
                phoneNumber: '13576639986',
                purePhoneNumber: '13576639986'
            }

            if (successFun) successFun(data)
        }, 300)
    }
}