import { is_strapi_mode } from "@/conf/conf"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const relations = [ 'activity_medias', 'publisher', 'activity_tags' ]

const plus = async (form: ONE): Promise<Activity> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('activity', null, __pm)
    if (is_str(src)) return netip(src, <Activity>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Activity>(res)
}

const edit = async (form: ONE, origin: ONE): Promise<Activity> => {
    const id: string = is_strapi_mode() ? origin['documentId'] : (origin['id'] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.put('activity', id, __pm)
    if (is_str(src)) return netip(src, <Activity>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<Activity>(res)
} 

const plus_media = async (media: ActivityMedia): Promise<ActivityMedia> => {
    const __pm: ONE = net_tool.build_data(media)
    const src: NET_RES = await master.pos('activity-media', null, __pm)
    if (is_str(src)) return netip(src, <ActivityMedia>{ });
    const res: ONE | MANY = (src as HttpResult).data
    return net_tool.one<ActivityMedia>(res)
}

export default {
    plus, edit,
    plus_media
}