
interface ReportPageWorkingStore {
    menu: LayoutMenuItem,
    identify: string, // 通常就叫 code

    columns: OTableColumn[],
    item: ONE,

    item_index: string,
    item_index_value: SN | undefined,

    switch_page_num: number, // 切换页面的次数

    walk_num: number, // 步行次数
    walk_value: number // 步行量
}

type REPORT_PAGE_WORKING_FIELD = 
    'menu' | 'code' | 
    'columns' | 'item' | 
    'item_index' | 'item_index_value'


// 临时数据
interface ReportDataTableCache {
    columns: OTableColumn[],
    pager: DynamicPager,
    total: number,
    data: MANY,
    id: DN
}

type REPORT_DATA_TABLE_CACHES = { [k: SN]: ReportDataTableCache }