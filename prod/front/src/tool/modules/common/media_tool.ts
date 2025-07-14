import { APP_W_DEF, DEV_MEDIA_ALLOW } from "@/conf/conf-dev"
import { imit, is_nice_arr, must_arr } from "../../util/valued"
import { authGetters } from "@/memory/global"
import { STS_MEDIA } from "@/conf/conf-status"

const generate_upload_img = (path: string, file: File, media: Media): Form.UploadImage => {
    return {
        path, file, link: media.url, data: media,
        __iive: true
    }
}

const replace_upload_img = (src: Form.UploadImage, data: Media): Form.UploadImage => {
    const ph: string = src.link || ''
    if (ph == data.urlSmall) {
        src.data = data
    }
    else if (ph == data.url) {
        src.data = data
    }
    return src
}

const convert_upload_imgs = (srcs: Media[]): Form.UploadImages => {
    if (is_nice_arr(srcs)) {
        return srcs.map((e: Media) => {
            return <Form.UploadImage>{
                path: e.urlSmall, link: e.url, data: e,
                __iive: true, file: null
            }
        })
    }
    return [ ]
}

const build_plus_data = (origin: Media, belongId: string | number): Media => {
    return <Media>{
        url: origin.url,
        urlSmall: origin.urlSmall,
        mediaType: origin.mediaType,
        isGallery: origin.isGallery,
        w: origin.w, 
        h: origin.h,
        isAllow: STS_MEDIA.ALLOW.YES,
        isSex: STS_MEDIA.SEX.NO,

        product: belongId,
        user: authGetters.userid,
        userId: authGetters.userid + ''
    }
}

const group_publish_medias = (banner: Form.UploadImages, gallery: Form.UploadImages): Media[] => {
    const bns: Media[] = must_arr(banner).filter((e: Form.UploadImage) => e.__iive)
        .map((e: Form.UploadImage) => (e.data as Media))
    const gss: Media[] = must_arr(gallery).filter((e: Form.UploadImage) => e.__iive)
        .map((e: Form.UploadImage) => (e.data as Media))
    return [ ...bns, ...gss ]
}

const group_medias_ids = (medias: Media[]) => {
    return must_arr(medias).map((e: Media) => {
        return e.documentId || ''
    }).filter((e: string) => (e != ''))
}

const is_1x1 = (w: number, h: number) => {
    const __c = w - h
    const res = __c < 10 && __c > -10
    return res
}

const __img_h_view = (w_wrapper: number, w_img: number, h_img: number, iimit: number): number | null => {
    if (w_wrapper && w_img && h_img) {
        if (is_1x1(w_img, h_img)) return w_wrapper - 9;

        let res = (w_wrapper * h_img / w_img)
        if (res > iimit) {
            let c = (res / 8) - 10
            c = c < 0 ? 0 : c
            res = iimit + c
        }
        return res
    }
    return null
}
const img_h_view = (w_wrapper: number, w_img: number, h_img: number, iimit: number): string => {
    // console.log('w =', w_wrapper, w_img, h_img, (w_wrapper * h_img / w_img))
    const src: number | null = __img_h_view(w_wrapper, w_img, h_img, iimit)
    return src ? (src + 'px') : '14em'
}

// 计算首页 banenr 高度
const cpu_index_banner_h = (banners: Media[], w_web: number = APP_W_DEF): number => {
    let w = 0
    let h = 0
    banners.map((e: Media) => {
        const __w: number | null = e.w
        const __h: number | null = e.h
        w += __w
        h += __h
    })
    let src: number | null = __img_h_view(w_web, w, h, 1080)
    //
    if (!src || src < (APP_W_DEF - 100)) {
        src = APP_W_DEF - 100
    }
    // console.log('banner h =', src, h, w, w_web.value)
    return src + 1 // + 'px'
}

// 过滤掉色情
const fer_sex = (src: Media[] = []): Media[] => {
    return must_arr(src).filter((e: Media) => {
        if (DEV_MEDIA_ALLOW.ALLOW_SEX === 1) {
            // 允许色情
            return true
        }
        else {
            // 不允许色情
            const __v: number | undefined = e.isSex
            // 色情内容不返回
            if (__v === STS_MEDIA.SEX.YES) { return false }
        }
        return true
    })
}

// { 'v': '近期一百人关注', 'color': '#f6672e', 'colorHv': '#ec6129' }
// 过滤掉允许
const fer_allow = (src: Media[] = []): Media[] => {
    return must_arr(src).filter((e: Media) => {
        if (DEV_MEDIA_ALLOW.OPEN_ALLOW) {
            // 只展示 isAllow
            const __v: number | undefined = e.isAllow
            // 
            if (__v != null) {
                if (__v === STS_MEDIA.ALLOW.YES) { return true }
            }
            return false
        }
        else {
            // 无限制
            return true
        }
    })
}

const view_imit = (src: Media[], star: number, max: number): Media[] => {
    const len = src.length
    if (len) {
        let __imit: number = imit(max, 0, len)
        let __star: number = imit(star, 0, star)
        return src.slice(__star, __imit)
    }
    return src 
}

export default {
    fer_sex, fer_allow,

    view_imit,

    img_h_view,
    __img_h_view,

    generate_upload_img,
    convert_upload_imgs,
    replace_upload_img,
    
    group_medias_ids,
    group_publish_medias,
    build_plus_data,
    
    cpu_index_banner_h
}