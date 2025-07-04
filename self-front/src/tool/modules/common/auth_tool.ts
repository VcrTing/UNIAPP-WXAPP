import { needLogin } from "@/memory/global"
import { future } from "@/tool/util/future"

// do after check
const doac = (func: Function) => future(async () => {
    if (await needLogin()) {
        
    }
    else {
        await func()
    }
})

export default {
    doac
}