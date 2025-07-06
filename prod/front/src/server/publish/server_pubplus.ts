import { is_strapi_mode } from "@/conf/conf"
import { DEV_DOC_ID, DEV_ID } from "@/conf/conf-dev"
import { STS, STS_PRODUCT } from "@/conf/conf-status"
import { app, master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import product_tool from "@/tool/modules/product_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import { must_int } from "@/tool/util/valued"

// const relations = [ 'activity_medias', 'publisher', 'activity_tags', 'activity_address' ]

const plus = async (form: ONE): Promise<Product> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await app.pos('product', null, __pm)
    if (is_str(src)) return netip(src, <Product>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Product>(res)
}

const edit = async (form: ONE, origin: ONE): Promise<Product> => {
    const id: string = is_strapi_mode() ? origin[DEV_DOC_ID] : (origin[DEV_ID] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.put('product', id, __pm)
    if (is_str(src)) return netip(src, <Product>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Product>(res)
} 

const plus_media = async (media: Media): Promise<Media> => {
    const __pm: ONE = net_tool.build_data(media)
    const src: NET_RES = await app.pos('media', null, __pm)
    if (is_str(src)) return netip(src, <Media>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Media>(res)
}

const delete_media = async (media: Media): Promise<Media> => {
    const __pm: ONE = net_tool.build_data({ isAllow: STS.NO })
    const src: NET_RES = await app.put('media', media.documentId, __pm)
    if (is_str(src)) return netip(src, <Media>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Media>(res)
}

const deleted = async (documentId: string): Promise<Product> => {
    const __pm: ONE = { }
    __pm[ STS_PRODUCT.STATUS.K ] = STS_PRODUCT.STATUS.DIE
    return await edit(__pm, { documentId })
} 

// 上架
const takeon = async (v: Product, inv: number): Promise<Product> => {
    const documentId: string = v.documentId
    const __pm: ONE = { }
    __pm[ STS_PRODUCT.STATUS.K ] = STS_PRODUCT.STATUS.PASS
    if (product_tool.show_inv_many(v)) {
        __pm['inv'] = must_int(inv)
    }
    //
    product_tool.init_inv(v.invTyped, __pm)
    //
    return await edit(__pm, { documentId })
} 

export default {
    plus, edit, deleted,
    plus_media, delete_media,
    takeon
}