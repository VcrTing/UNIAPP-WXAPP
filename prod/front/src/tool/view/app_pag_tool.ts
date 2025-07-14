import { tipsucc } from "../uni/uni-global"
import { promise } from "../util/future"
import { must_one } from "../util/valued"
import { has_document } from "../web/doc"

const share = (v: Product) => promise(() => {
    let uri = ''
    const docid: string = must_one<Product>(v).documentId
    if (docid) {
        if (has_document()) {
            uri = window.location.href
            uri += (`?product=${v.documentId}&redin=1&back=index`)

            tipsucc('分享链接，复制成功。')
        }
        else {
            console.log('小程序/APP 分享。')
        }
    }
    console.log('分享的链接 =', uri)
})

export default {
    share
}