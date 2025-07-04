import { must_arr } from "@/tool/util/valued"

// iist 数据
// dynamic 当前所属的 动态分页参数
const merge_list_to_house = (iist: MANY, dynamic: DynamicPager, origin: DATA_HOUSE): DATA_HOUSE => {
    const _hs: DATA_HOUSE = { }
    const len: number = dynamic.size
    let _idx: number = 0
    for (let i= dynamic.star; i< len; i++ ) {
        _idx = i - dynamic.star
        _hs[ i ] = iist[ _idx ]
    }
    return { ..._hs, ...origin }
}

export default {
    merge_list_to_house
}