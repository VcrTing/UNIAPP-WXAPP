import { is_nice_arr, must_arr } from "../util/valued"

const generate_upload_img = (path: string, file: File, media: ActivityMedia): Form.UploadImage => {
    return {
        path, file, link: media.url, data: media,
        __iive: true
    }
}

const replace_upload_img = (src: Form.UploadImage, data: ActivityMedia): Form.UploadImage => {
    const ph: string = src.link || ''
    if (ph == data.urlSmall) {
        src.data = data
    }
    else if (ph == data.url) {
        src.data = data
    }
    return src
}

const convert_upload_imgs = (srcs: ActivityMedia[]): Form.UploadImages => {
    if (is_nice_arr(srcs)) {
        return srcs.map((e: ActivityMedia) => {
            return <Form.UploadImage>{
                path: e.urlSmall, link: e.url, data: e,
                __iive: true, file: null
            }
        })
    }
    return [ ]
}

const build_activity_plus_data = (origin: ActivityMedia, activityDocumentId: string | number): ActivityMedia => {
    return <ActivityMedia>{
        url: origin.url,
        urlSmall: origin.urlSmall,
        mediaType: origin.mediaType,
        isGallery: origin.isGallery,
        activity: activityDocumentId,
        w: origin.w, 
        h: origin.h
    }
}

const group_publish_medias = (banner: Form.UploadImages, gallery: Form.UploadImages): ActivityMedia[] => {
    const bns: ActivityMedia[] = must_arr(banner).filter((e: Form.UploadImage) => e.__iive)
        .map((e: Form.UploadImage) => (e.data as ActivityMedia))
    const gss: ActivityMedia[] = must_arr(gallery).filter((e: Form.UploadImage) => e.__iive)
        .map((e: Form.UploadImage) => (e.data as ActivityMedia))
    return [ ...bns, ...gss ]
}

const group_medias_ids = (medias: ActivityMedia[]) => {
    return must_arr(medias).map((e: ActivityMedia) => {
        return e.documentId || ''
    }).filter((e: string) => (e != ''))
}

export default {
    generate_upload_img,
    convert_upload_imgs,
    replace_upload_img,
    
    group_medias_ids,
    group_publish_medias,
    build_activity_plus_data,
    
}