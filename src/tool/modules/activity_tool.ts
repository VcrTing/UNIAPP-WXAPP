import { DATA_ACTIVITY_STATUS } from "@/conf/conf-datas"
import { arrfind, arrimit } from "../util/iodash"
import { must_arr, must_one } from "../util/valued"


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

export default {
    getbanner: (v: Activity): ActivityMedia[] => {
        const mds: ActivityMedia[ ] = must_arr(v.activity_medias)
        const banners: ActivityMedia[ ] = mds.filter(e => e.isGallery)
        return must_arr(banners)
    },
    getindex_banner: (v: Activity): ActivityMedia[] => {
        const mds: ActivityMedia[ ] = must_arr(v.activity_medias)
        //
        const banners: ActivityMedia[ ] = mds.filter(e => e.isGallery)
        const gallery: ActivityMedia[ ] = mds.filter(e => !e.isGallery)
        return arrimit([ ...banners, ...gallery ], 3)
    },
    getweek, gettime_start, gettime_end,

    gettime: (v: Activity): string => {
        const st: string = v.startTime || ''
        return getweek(v) + ' ' + gettime_start(v)
    },

    getfar,

    getaddress: (v: Activity): string => {
        const ad: ActivityAddress = v.activity_address || { }
        const src: string = ad.address || ad.addressSystem
        return src ? src.substring(0, 10) : '地点未定'
    },

    getstatus: (v: Activity): string => {
        const sts: number = v.dataStatus || 0
        const src = DATA_ACTIVITY_STATUS
        const one = arrfind(src, sts, 'v')
        return must_one<Conf.Tab>(one).name || '状态缺失'
    }
}