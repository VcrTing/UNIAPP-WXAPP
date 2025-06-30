import { DATA_ACTIVITY_STATUS, DATA_ACTIVITY_TYPED_SM, DATA_PUBLISH_LIMIT } from "@/conf/conf-datas"
import { arrfind, arrgotv, arrimit } from "../util/iodash"
import { deepcopy, formfiimit, group_search_txt, must_arr, must_int, must_one, positive } from "../util/valued"
import { authGetters } from "@/memory/global"
import times from "../web/times"
import media_tool from "./common/media_tool"

    // 0-待完善, 1-审核中, 2-已发布, 3-已取消, 4-已结束, 5-已下架

    // 首页 展示多少张 图片
    const ITEM_IMG_VIEW_LIMIT = 1

    // 获取 图片
    const __medias = (v: Product): Media[] => {
        let mds: Media[ ] = must_arr(v.medias)
        // 不允许色情
        mds = media_tool.fer_sex(mds)
        // 不允许被禁止的
        mds = media_tool.fer_allow(mds)
        // 返回
        return mds
    }   

    const build_edit_data = (src: ONE) => {
        
        const tgsid = arrgotv(src.tags)
        const typed: number = src.typed
        const userid: string = authGetters.userid

        let res: ONE = { }
        formfiimit(res, src, [ 
            'title', 'fee', 'introduction', 'typed',
            'address', 'city', 'area', 'latitude', 'longitude',
            'startTime', 'endTime', 'participantLimit',
            // 'activity_medias'
        ])
        res['publisher'] = userid
        res['activity_tags'] = tgsid

        // 私密活动
        if (typed == DATA_ACTIVITY_TYPED_SM.v) {
            res['participantLimit'] = DATA_PUBLISH_LIMIT.JOINER
        }
        return res
    }

    // 构建搜索
    const group_search_field = (
        activity: Product | ONE,
        addr: Address,
        tags: Tag[]
    ) => {
        let s: string = '_'
        s += (group_search_txt(activity.title))
        s += (group_search_txt(addr.address))
        s += (group_search_txt(addr.city))
        s += (group_search_txt(addr.area))
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
    const gettitle_sub = (v: Product): string | undefined => {
        return v.titleSubForSell
    }

export default {
    build_edit_data,
    group_search_field,

    getbanner: (v: Product): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = mds.filter(e => !e.isGallery)
        return must_arr(res)
    },
    getgallery: (v: Product): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = mds.filter(e => e.isGallery)
        return must_arr(res)
    },
    getindex_banner: (v: Product, imit: number = ITEM_IMG_VIEW_LIMIT): Media[] => {
        const mds: Media[ ] = __medias(v)
        //
        const banners: Media[ ] = mds.filter(e => !e.isGallery)
        const gallery: Media[ ] = mds.filter(e => e.isGallery)
        return arrimit([ ...banners, ...gallery ], imit)
    },

    getprice: (v: Product): string => {
        const src: number = v.price
        return src + ''
    },
    getpricesub: (v: Product): string => {
        return '首单价'
    },
    

    gettitle_sub,

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
        return media_tool.img_h_view(w_item, v.w, v.h)
    }
}