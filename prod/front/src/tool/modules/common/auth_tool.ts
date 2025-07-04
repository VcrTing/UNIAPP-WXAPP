import { needLogin } from "@/memory/global"
import { future, futuring } from "@/tool/util/future"

// do after check
const doac = (func: Function) => future(async () => {
    if (await needLogin()) {
        
    }
    else {
        await func()
    }
})
const doacing = (aii: ONE, func: Function) => futuring(aii, async () => {
    if (await needLogin()) {
        
    }
    else {
        await func()
    }
})

export default {
    doac,
    doacing
}