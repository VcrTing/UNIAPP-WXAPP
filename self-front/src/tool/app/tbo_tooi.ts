import { uiDispatch, uiState } from "@/memory/global"
import { future } from "../util/future"
import ui_tooi from "./ui_tooi"
import { must_arr } from "../util/valued"

// 奇数
const tr_odd = (index: number) => (index % 2 != 0)
const tr_last = (index: number, data: MANY | DATA_FAKER = []) => ((data.length - 1) == index)

export const tbo_tr_class = (index: number, data: MANY | DATA_FAKER = []) => {
    const src = (tr_odd(index) ? 'tr-odd' : 'tr-even')
    return src + (tr_last(index, data) ? ' tr-last' : '')
}


const ser_columns = (origins: OTableColumnOrigin[] = [ ]): OTableColumn[] => {

    const cp: number = uiState.root_font_size_coefficient
    const cols = <OTableColumn[]>[ ]

    for (const ori of origins) {
        const __c = <OTableColumn>{ }

        const _w: number = ui_tooi.scale_px(cp, ori.width)
        __c.__class = 'ta-c ' + ori.align + ' ' + (ori.freeze ? 'td-freeze' : '')
        __c.__style = { 'width': _w + 'px' }
        __c.__kiy = ori.dataIndex;
        __c.__tit = ori.title;
        __c.__w = _w;

        cols.push(__c)
    }
    return cols
}
    
const init_test_columns = async (): Promise<OTableColumn[]> => {
    const cols = ser_columns(<OTableColumnOrigin[]> [
        { dataIndex: "#", freeze: false, width: "50", title: "#", align: "center", __w: 0, __class: '', __style: <ONE>{} },
        { dataIndex: "物料编码", freeze: true, width: "120", title: "物料编码", align: "center", __w: 0, __class: '', __style: <ONE>{} },
        { dataIndex: "物料名称", freeze: false, width: "120", title: "物料名称", align: "center", __w: 0, __class: '', __style: <ONE>{} },
        { dataIndex: "库存量", freeze: false, width: "120", title: "库存量", align: "center", __w: 0, __class: '', __style: <ONE>{} },
        { dataIndex: "单位", freeze: false, width: "120", title: "单位", align: "center", __w: 0, __class: '', __style: <ONE>{} },
    ])
    return cols ? cols : []
}

export const DESC = 'desc'
export const ASC = 'asc'
export const TBO_SORT_KEY_DEF = '__none__'

// 排序
const pkg_sort_key = (key: string) => ( key ? key : '' )
const pkg_sort_value = (v: string) => ( (v && v.trim().length > 0) ? v.trim() : DESC)
const sort_value = (n: number) => (n <= 0) ? DESC : ASC

// 宽度
const computed_columns_w = (columns: OTableColumn[] = [ ]) => {
    let _w: number = 0
    const cos: OTableColumn[] = must_arr( columns )
    cos.map((e: OTableColumn) => { _w += e.__w })
    return _w == 0 ? '100%' : (_w + 'px')
}

// 加入数据

export default {
    tr_odd,
    tr_last,
    tbo_tr_class,

    ser_columns,
    init_test_columns,

    pkg_sort_key,
    pkg_sort_value,

    sort_value,

    computed_columns_w
}