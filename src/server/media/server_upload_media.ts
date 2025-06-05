import { is_strapi_mode } from "@/conf/conf"
import { file } from "@/tool/http/http"

import strapi_media_tool from "@/tool/strapi/strapi_media_tool"

// 上传文件
const upload = async (files: File[]) => {
    let res = { }
    if (is_strapi_mode()) {
        const data = strapi_media_tool.buil_upload_body(new FormData(), files)
        const src = await file.uio('upload', null, data)
        console.log('strapi 文件上传成功 =', src)
    }
    else {

    }
    return res;
}

export default {
    upload
}