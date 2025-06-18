import { DATA_ACTIVITY_JOINER_LIMIT, DATA_ACTIVITY_STATUS, DATA_ACTIVITY_TYPED_SM } from "@/conf/conf-datas"
import { arrfind, arrgotv, arrimit } from "../util/iodash"
import { deepcopy, formfiimit, must_arr, must_int, must_one, positive } from "../util/valued"
import { authGetters } from "@/memory/global"

    // 0-待完善, 1-审核中, 2-已发布, 3-已取消, 4-已结束, 5-已下架

    const getweek = (v: Activity): string => {
        const st: string = v.startTime || ''
        return '周五'
    }
    const gettime_start = (v: Activity): string => {
        const st: string = v.startTime || ''
        return '05.23 20:30'
    }
    const gettime_end = (v: Activity): string => {
        const st: string = v.endTime || ''
        return '22:30'
    }
    const getfar = (v: Activity): string => {
        return '13.3km'
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
            res['participantLimit'] = DATA_ACTIVITY_JOINER_LIMIT
        }
        return res
    }

export default {
    build_edit_data,

    getjoin_limit, getjoiner_len,
    getjoin_remaining: (v: Activity): number => {
        const lm: number = getjoin_limit(v);
        const ln: number = getjoiner_len(v);
        return positive(must_int(lm - ln));
    },

    getbanner: (v: Activity): ActivityMedia[] => {
        const mds: ActivityMedia[ ] = must_arr(v.activity_medias)
        const res: ActivityMedia[ ] = mds.filter(e => !e.isGallery)
        return must_arr(res)
    },
    getgallery: (v: Activity): ActivityMedia[] => {
        const mds: ActivityMedia[ ] = must_arr(v.activity_medias)
        const res: ActivityMedia[ ] = mds.filter(e => e.isGallery)
        return must_arr(res)
    },
    getindex_banner: (v: Activity): ActivityMedia[] => {
        const mds: ActivityMedia[ ] = must_arr(v.activity_medias)
        //
        const banners: ActivityMedia[ ] = mds.filter(e => !e.isGallery)
        const gallery: ActivityMedia[ ] = mds.filter(e => e.isGallery)
        return arrimit([ ...banners, ...gallery ], 3)
    },
    getweek, gettime_start, gettime_end,

    gettime: (v: Activity): string => {
        const st: string = v.startTime || ''
        return getweek(v) + ' ' + gettime_start(v)
    },

    getfar,

    getindex_address: (v: Activity): string => {
        // const ad: ActivityAddress = v.activity_address || { }
        const src: string = v.address || ''
        return src ? src.substring(0, 10) : '地点未定'
    },
    getaddress: (v: Activity): string => {
        // const ad: ActivityAddress = v.activity_address || { }
        const src: string = v.address || ''
        return src ? src : '地点未定'
    },

    getstatus: (v: Activity): string => {
        const sts: number = v.dataStatus || 0
        const src = DATA_ACTIVITY_STATUS
        const one = arrfind(src, sts, 'v')
        return must_one<Conf.Tab>(one).name || '状态缺失'
    },

    istyped_sm: (v: Activity): boolean => {
        const tpd: number = must_int(v.typed)
        return tpd === DATA_ACTIVITY_TYPED_SM.v
    }
}