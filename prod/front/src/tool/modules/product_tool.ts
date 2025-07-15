import { DATA_ACTIVITY_STATUS, DATA_ACTIVITY_TYPED_SM, DATA_PRODUCT_TYPED, DATA_PRODUCT_TYPED_FREE, DATA_PRODUCT_TYPED_INV, DATA_PRODUCT_TYPED_INV_ALONE, DATA_PRODUCT_TYPED_INV_INFINI, DATA_PRODUCT_TYPED_INV_MANY, DATA_PRODUCT_TYPED_SM, DATA_PUBLISH_LIMIT } from "@/conf/conf-datas"
import { arrfind, arrgotv, arrhas, arrimit, arrsort } from "../util/iodash"
import { deepcopy, formfiimit, group_search_txt, must_arr, must_int, must_one, positive } from "../util/valued"
import { authGetters } from "@/memory/global"
import times from "../web/times"
import media_tool from "./common/media_tool"
import { is_json } from "../util/typed"
import { STS, STS_PRODUCT } from "@/conf/conf-status"
import { DEV_MEDIA_VIEW, DEV_PRODUCT } from "@/conf/conf-dev"
import product_build_tool from "./func/product_build_tool"

    // 0-待完善, 1-审核中, 2-已发布, 3-已取消, 4-已结束, 5-已下架

    // 首页 展示多少张 图片
    const ITEM_IMG_VIEW_LIMIT_DEF = 1

    // 获取 图片
    const __medias = (v = <Product>{ }): Media[] => {
        let mds: Media[ ] = must_arr(v.medias)
        // 不允许色情
        mds = media_tool.fer_sex(mds)
        // 不允许被禁止的
        mds = media_tool.fer_allow(mds)
        // console.log('medias =', mds)
        // 返回
        return mds
    }   

    const init_inv = (invTyped: number, res: ONE) => {
        // 库存设计
        // 单件
        if (invTyped === DEV_PRODUCT.INV_TYPED.ALONE) {
            res['inv'] = 1;
        }
        // 无限制
        else if (invTyped === DEV_PRODUCT.INV_TYPED.INFINI) {
            res['inv'] = 999999
        }
        res['invWeak'] = res['inv']
        return res
    }
    const build_edit_data = (src: ONE) => {
        
        const tgsid = arrgotv(src.tags)
        const userid: number = authGetters.userid

        let res: ONE = { }
        formfiimit(res, src, [ 
            'title', 'introduction', 'typed',
            'inv', 'invTyped', 'price', 'priceFirst', 
        ])
        res['user'] = userid
        res['tags'] = tgsid
        if (!res['priceFirst']) {
            res['priceFirst'] = res['price']
        }

        // 库存设计
        const invTyped = src.invTyped
        // 单件
        res = init_inv(invTyped, res)

        // 随机一点浏览量
        res['numView'] = product_build_tool.gen_init_num_view()
        res['numHot'] = res['numView']

        return res
    }

    // 构建搜索
    const group_search_field = (
        one: Product | ONE,
        tags: Tag[]
    ) => {
        let s: string = '_'
        s += (group_search_txt(one.title))
        s += (group_search_txt(one.price + ''))
        s += (group_search_txt(one.introduction))
        // s += (group_search_txt(addr.address))
        // s += (group_search_txt(addr.city))
        // s += (group_search_txt(addr.area))
        must_arr(tags).map((e: Tag) => {
            const __s: string = e.search || ''
            s += (group_search_txt(__s))
            return e;
        })
        return s
    }

    const getnum_sell = (v: Product): number => {
        return v.numSell || 1
    }
    const has_title_sub = (v: Product): boolean => {
        return v.titleSubForSell ? true : false
    }
    const gettitle_sub_txt = (v: Product): string => {
        let src: string = v.titleSubForSell || ''
        if (!src) {
            return '近期多人关注'
        }
        return src 
    }

    // { "v": "近期一百人关注", "style": "color:#f6672e" }
    const gettitle_sub_json = (v: Product): ONE => {
        return JSON.parse(v.titleSubForSell.trim())
    }

    const is_sm = (v: Product): boolean => (v.typed === DATA_PRODUCT_TYPED_SM.v)

    const is_inv_alone = (v: Product): boolean => {
        const it: number = must_int(v.invTyped)
        return (it === DEV_PRODUCT.INV_TYPED.ALONE)
    }
    const is_inv_many = (v: Product): boolean => {
        const it: number = must_int(v.invTyped)
        return (it === DEV_PRODUCT.INV_TYPED.MANY)
    }
    const is_inv_infini = (v: Product): boolean => {
        const it: number = must_int(v.invTyped)
        return (it === DEV_PRODUCT.INV_TYPED.INFINI)
    }
    const show_inv_many = (v: Product): boolean => {
        if (is_sm(v)) {
            return is_inv_many(v)
        }
        return false
    }

    const gettyped_txt = (v: Product): string => {
        const __v: number = v.typed // || DATA_PRODUCT_TYPED_FREE.v
        for (let j= 0; j< DATA_PRODUCT_TYPED.length; j++ ) {
            const jj = DATA_PRODUCT_TYPED[j]
            if (jj.v === __v) return jj.name
        }
        return DATA_PRODUCT_TYPED_FREE.name
    }
    const getinv_typed_sub = (v: Product): string => {
        const __v: number = must_int(v.invTyped) // || DATA_PRODUCT_TYPED_FREE.v
        for (let j= 0; j< DATA_PRODUCT_TYPED_INV.length; j++ ) {
            const jj = DATA_PRODUCT_TYPED_INV[j]
            if (jj.v === __v) return jj.sub + ''
        }
        return DATA_PRODUCT_TYPED_INV_INFINI.sub + ''
    }
    const getinv_typed_txt = (v: Product): string => {
        const __v: number = must_int(v.invTyped) // || DATA_PRODUCT_TYPED_FREE.v
        for (let j= 0; j< DATA_PRODUCT_TYPED_INV.length; j++ ) {
            const jj = DATA_PRODUCT_TYPED_INV[j]
            if (jj.v === __v) return jj.name + ''
        }
        return DATA_PRODUCT_TYPED_INV_INFINI.name + ''
    }

    const is_review_no = (v: Product): boolean => {
        const vv: number = v.reviewStatus
        return vv === STS_PRODUCT.REVIEW.NO
    }

    const fiiter_by_typed = (src: Product[], i: number = DEV_PRODUCT.TYPED.SM): Product[] => {
        return must_arr(src).filter(e => {
            return (e.typed === i)
        })
    }

    const getinv = (src: Product): number => {
        return src.invWeak || 0
    }

export default {
    getinv,

    is_sm,

    fiiter_by_typed,
    
    init_inv,
    is_review_no,

    getinv_typed_txt,
    getinv_typed_sub,
    
    is_inv_many,
    is_inv_alone,
    is_inv_infini,
    
    show_inv_many,

    gettyped_txt,
    build_edit_data,
    group_search_field,

    getbanner: (v: Product): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = must_arr(mds.filter(e => !e.isGallery))
        if (res.length == 0) {
            return arrimit(mds, 1)
        }
        return must_arr(res)
    },
    getcover: (v = <Product>{ }): Media => {
        const mds: Media[ ] = __medias(v)
        return must_one(mds[0])
    },
    getgallery: (v: Product): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = mds.filter(e => e.isGallery)
        return must_arr(res)
    },
    getindex_banner: (v: Product, imit: number = ITEM_IMG_VIEW_LIMIT_DEF): Media[] => {
        const mds: Media[ ] = __medias(v)
        //
        const banners: Media[ ] = mds.filter(e => !e.isGallery)
        const gallery: Media[ ] = mds.filter(e => e.isGallery)
        return arrimit([ ...banners, ...gallery ], imit)
    },

    is_free: (v: Product): boolean => {
        if (!v.price) return true
        if (!v.priceFirst) return true
        return false
    },
    getprice: (v: Product): number => {
        return (v.price || 0)
    },
    getprice_less: (v: Product): number => {
        return v.priceFirst || 0
    },
    getprice_must: (v: Product): number => {
        let p: number = v.price || 0
        if (!p) {
            p = v.priceFirst || 0
        }
        return p || 0
    },
    gettitle: (v = <Product>{ }) => {
        return v.title || ''
    },

    getpricesub: (v: Product): string => {
        return '首单价'
    },
    
    getnum_view: (v: Product): number => {
        const __v: number = v.numView || 1
        return __v
    },

    has_title_sub,
    gettitle_sub_txt,
    gettitle_sub_json,

    getstatus: (v: Product): string => {
        const sts: number = v.dataStatus || 0
        const src = DATA_ACTIVITY_STATUS
        const one = arrfind(src, sts, 'v')
        return must_one<Conf.Tab>(one).name || '状态缺失'
    },

    getnum_sell_txt: (v: Product): string | undefined => {
        return '已售' + getnum_sell(v)
    },

    getcover_h: (vs: Media[], w_item: number): string => {
        const v: Media = vs[0]
        return media_tool.img_h_view(w_item, v.w, v.h, DEV_MEDIA_VIEW.ITEM_COVER_H_LIMIT)
    },

    gethonours: (v: Product): Tag[] => {
        const src: Tag[] = must_arr(v.honours)
        return arrsort(src, 'handsome')
    },

    has_content: (v: Product): boolean => {
        const cs = v.contentStatus
        return cs === STS.YES
    },


}