import uniRouter from "@/tool/uni/uni-router"
import server_product from "../product/server_product"
import { prodReFresh } from "@/memory/moduies"

const view = async (one: Product) => {
    const docid: string = one.documentId || ''
    if (docid) {
        const src: Product = await server_product.byid(docid)
        console.log('访问 商品 =', src, ' one =', one)
        prodReFresh('view', src)
        uniRouter.gopg('product_detail');
    }
}

export default {
    view
}