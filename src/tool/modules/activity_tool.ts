import { DATA_ACTIVITY_STATUS, DATA_ACTIVITY_TYPED_SM, DATA_PUBLISH_LIMIT } from "@/conf/conf-datas"
import { arrfind, arrgotv, arrimit } from "../util/iodash"
import { deepcopy, formfiimit, group_search_txt, must_arr, must_int, must_one, positive } from "../util/valued"
import { authGetters } from "@/memory/global"
import times from "../web/times"
import address_tool from "./common/address_tool"

    // 0-待完善, 1-审核中, 2-已发布, 3-已取消, 4-已结束, 5-已下架

    // 获取 图片
    const __medias = (v: Activity): Media[] => {
        const mds: Media[ ] = must_arr(v.activity_medias)
        // 不允许
        return mds
    }   

    const getweek = (v: Activity): string => {
        const st: string = v.startTime || ''
        return times.weakcn(st)
    }
    const gettime_start = (v: Activity): string => {
        const st: string = v.startTime || ''
        return times.fmt(st, 'MM.DD HH:mm')
    }
    const gettime_start_iong = (v: Activity): string => {
        const st: string = v.startTime || ''
        return times.fmts(st)
    }
    const gettime_end = (v: Activity): string => {
        const st: string = v.startTime || ''
        const ed: string = v.endTime || ''
        
        return '22:30'
    }
    const getstarttime_remaining = (v: Activity): string => {
        const minutes: number = times.remaining(null, v.startTime)
        if (minutes > 360) {
            let h: number = minutes / 60;
            return Math.floor(h ? h : 6 ) + ' 小时'
        }
        return minutes + ' 分钟'
    }
    const getfar = (v: Activity): string => {
        let addr: Address | Activity = must_one(v.activity_address)
        if (!addr.documentId) {
            addr = v
        }
        const __km = address_tool.cpu_km_for_user(v)
        return __km
    }
    const getjoin_limit = (v: Activity): number => {
        return v.participantLimit
    }
    const getjoiner_len = (v: Activity): number => {
        const jos: ONE[] = v.activity_registrations || [];
        return jos ? jos.length : 0
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
        activity: Activity | ONE,
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

export default {
    build_edit_data,
    group_search_field,

    getjoin_limit, getjoiner_len,
    getjoin_remaining: (v: Activity): number => {
        const lm: number = getjoin_limit(v);
        const ln: number = getjoiner_len(v);
        return positive(must_int(lm - ln));
    },

    getbanner: (v: Activity): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = mds.filter(e => !e.isGallery)
        return must_arr(res)
    },
    getgallery: (v: Activity): Media[] => {
        const mds: Media[ ] = __medias(v)
        const res: Media[ ] = mds.filter(e => e.isGallery)
        return must_arr(res)
    },
    getindex_banner: (v: Activity): Media[] => {
        const mds: Media[ ] = __medias(v)
        //
        const banners: Media[ ] = mds.filter(e => !e.isGallery)
        const gallery: Media[ ] = mds.filter(e => e.isGallery)
        return arrimit([ ...banners, ...gallery ], 3)
    },
    getweek, gettime_start, gettime_end,
    gettime_start_iong,

    gettime: (v: Activity): string => {
        const st: string = v.startTime || ''
        return getweek(v) + ' ' + gettime_start(v) + ' - ' + gettime_end(v)
    },
    gettime_short: (v: Activity): string => {
        const st: string = v.startTime || ''
        return getweek(v) + ' ' + times.fmt(st, 'HH 点')
    },

    getfar, getstarttime_remaining,

    getindex_address: (v: Activity): string => {
        // const ad: Address = v.activity_address || { }
        const src: string = v.address || ''
        return src ? src.substring(0, 10) : '地点未定'
    },
    getaddress: (v: Activity): string => {
        // const ad: Address = v.activity_address || { }
        const src: string = v.address || ''
        return src ? src : '地点未定'
    },

    getstatus: (v: Activity): string => {
        const sts: number = v.dataStatus || 0
        const src = DATA_ACTIVITY_STATUS
        const one = arrfind(src, sts, 'v')
        return must_one<Conf.Tab>(one).name || '状态缺失'
    },

    istyped_sm: (v = <Activity>{ }): boolean => {
        const tpd: number = must_int(v.typed)
        return tpd === DATA_ACTIVITY_TYPED_SM.v
    },
    isstarted: (v: Activity): boolean => {
        return v.startTime ? !times.bigger(v.startTime) : false
    }
}