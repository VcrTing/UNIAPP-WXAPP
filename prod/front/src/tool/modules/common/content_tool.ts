import { DEV_CONTENT_CATEGORY } from "@/conf/conf-dev"
import { is_nice_sn, must_arr } from "@/tool/util/valued"


const split_end = (src: string): string[] => {
    const res = <string[]>[ ]
    if (is_nice_sn(src)) {
        const st = src.split('。')
        must_arr(st).map((e: string) => {
            if (e) {
                res.push(e + '。')
            }
        })
    }
    return res
}

const is_gallery = (v: ProductContent): boolean => {
    return v.category === DEV_CONTENT_CATEGORY.GALLERY
}

export default {
    split_end,
    is_gallery
}