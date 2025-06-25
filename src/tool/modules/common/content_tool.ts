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

export default {
    split_end
}