import { is_strapi_mode } from "@/conf/conf"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import { is_arr } from "@/tool/util/typed"

const relations = [ 'activity_medias', 'publisher', 'activity_tags' ]

const plus = async (form: ONE): Promise<Activity> => {
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.pos('activity', null, __pm)
    const res: ONE | MANY = (src as HttpResult).data
    return !is_arr(res) ? (res as Activity) : <Activity>{ }
}

const edit = async (form: ONE, origin: ONE): Promise<Activity> => {
    const id: string = is_strapi_mode() ? origin['documentId'] : (origin['id'] + '')
    const __pm: ONE = net_tool.build_data(form)
    const src: NET_RES = await master.put('activity', id, __pm)
    const res: ONE | MANY = (src as HttpResult).data
    return !is_arr(res) ? (res as Activity) : <Activity>{ }
} 

const plus_media = async (media: ActivityMedia): Promise<ActivityMedia> => {
    const __pm: ONE = net_tool.build_data(media)
    const src: NET_RES = await master.pos('activity-media', null, __pm)
    const res: ONE | MANY = (src as HttpResult).data
    return !is_arr(res) ? (res as ActivityMedia) : <ActivityMedia>{ }
}

export default {
    plus, edit,
    plus_media
}