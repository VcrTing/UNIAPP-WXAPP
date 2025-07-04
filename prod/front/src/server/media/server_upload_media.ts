import { is_strapi_mode } from "@/conf/conf"
import { __net_file_url } from "@/conf/conf-endpoints"
import { authGetters } from "@/memory/global"
import { file } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"

import strapi_media_tool from "@/tool/strapi/strapi_media_tool"
import { upload_file } from "@/tool/uni/uni-app"

// 上传文件
const activity = async (path: string, data: ONE = { }): Promise<Media> => {
    const url = __net_file_url('any')
    const src: NET_RES = await upload_file(url, path, data)
    return net_tool.data(src);
}

const product = async (path: string, data: ONE = { }): Promise<Media> => {
    const url = __net_file_url('any')
    const src: NET_RES = await upload_file(url, path, data)
    return net_tool.data(src);
}

// 上传文件 到 用户 库
const user = async (path: string): Promise<UserMedia> => {
    const url = __net_file_url('any')
    const src: NET_RES = await upload_file(url, path, { userId: authGetters.userid })
    return net_tool.data(src);
}

export default {
    user,
    product
}