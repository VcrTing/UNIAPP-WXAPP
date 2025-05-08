
const EMPTY = [ { label: '-- 无可选 --', value: undefined } ]
const ITEM_CLEAR = { label: '(清空选择)', value: '' }

const must_arr = (src: any) => ( src && (src instanceof Array) ) ? src : [ ]

const init_select_items = (src: MANY = [], pk: string, pk_v: string, need_sub: boolean = true): OSelectItem[] => {
    const res = [ ]
    must_arr(src).map((e: ONE) => {
        res.push(<OSelectItem> {
            label: e[ pk ],
            value: e[ pk_v ] })
    })
    need_sub ? res.push( ITEM_CLEAR ) : undefined
    return res
}

const def_v = (src: OSelectItem[] = []) => (src[0].value)

const ioc_label = (items: OSelectItem[], v: O_SELECT_CHOISE) => {
    let res = ''
    must_arr(items).map((e: OSelectItem) => { if (e.value == v) { res = e.label } })
    return res
}

export default {
    init_select_items,
    ioc_label,
    def_v,

    EMPTY,
    ITEM_CLEAR
}