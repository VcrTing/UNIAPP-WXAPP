import { DEV_CONTENT_CATEGORY } from "@/conf/conf-dev"
import { deepcopy, is_nice_sn, must_arr } from "@/tool/util/valued"


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

// 是否媒体
const is_medias = (v: ProductContent): boolean => {
    return v.category === DEV_CONTENT_CATEGORY.MEDIAS
}

// 构建内容
const build_content_medias = (): ProductContent => {
    return <ProductContent>{
        category: DEV_CONTENT_CATEGORY.MEDIAS,
        galleries: <Media[]>[ ]
    }
}
const build_content_words = (): ProductContent => {
    return <ProductContent>{
        category: DEV_CONTENT_CATEGORY.WORD,
        content: ''
    }
}


export default {
    split_end,
    is_medias,
    build_content_words,
    build_content_medias
}