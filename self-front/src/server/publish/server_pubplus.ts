import { is_strapi_mode } from "@/conf/conf"
import { DEV_DOC_ID, DEV_ID } from "@/conf/conf-dev"
import { STS_ACTIVITY } from "@/conf/conf-status"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

// const relations = [ 'activity_medias', 'publisher', 'activity_tags', 'activity_address' ]

const plus = async (form: ONE): Promise<Activity> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('activity', null, __pm)
    if (is_str(src)) return netip(src, <Activity>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Activity>(res)
}

const edit = async (form: ONE, origin: ONE): Promise<Activity> => {
    const id: string = is_strapi_mode() ? origin[DEV_DOC_ID] : (origin[DEV_ID] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.put('activity', id, __pm)
    if (is_str(src)) return netip(src, <Activity>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Activity>(res)
} 

const plus_media = async (media: Media): Promise<Media> => {
    const __pm: ONE = net_tool.build_data(media)
    const src: NET_RES = await master.pos('media', null, __pm)
    if (is_str(src)) return netip(src, <Media>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Media>(res)
}

const deleted = async (documentId: string): Promise<Activity> => {
    const __pm: ONE = { }
    __pm[ STS_ACTIVITY.STATUS.K ] = STS_ACTIVITY.STATUS.DIE
    return await edit(__pm, { documentId })
} 

export default {
    plus, edit, deleted,
    plus_media
}