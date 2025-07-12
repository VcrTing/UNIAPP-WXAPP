import uniRouter from "@/tool/uni/uni-router"
import server_product from "../product/server_product"
import { prodReFresh } from "@/memory/moduies"

const __v = async (docid: string) => {
    return await server_product.byid(docid)
}

const view = async (one: Product) => {
    const docid: string = one.documentId || ''
    if (docid) {
        const src: Product = await __v(docid)
        // console.log('访问 商品 =', src, ' one =', one)
        await prodReFresh('view', src)
        uniRouter.gopg('product_detail');
    }
}
const view_buy = async (one: Product) => {
    const docid: string = one.documentId || ''
    if (docid) {
        const src: Product = await server_product.mine_buy_byid(docid)
        // console.log('访问 商品 =', src, ' one =', one)
        await prodReFresh('view', src)
        uniRouter.gopg('product_detail');
    }
}

export default {
    __v,
    view,
    view_buy
}