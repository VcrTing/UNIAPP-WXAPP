import { is_strapi_mode } from "@/conf/conf"
import { __net_file_url } from "@/conf/conf-endpoints"
import { file } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"

import strapi_media_tool from "@/tool/strapi/strapi_media_tool"
import { upload_file } from "@/tool/uni/uni-app"

// 上传文件
const activity = async (path: string, data: ONE = { }): Promise<ActivityMedia> => {
    const url = __net_file_url('activity')
    const src: NET_RES = await upload_file(url, path, data)
    return net_tool.data(src);
}

export default {
    activity
}