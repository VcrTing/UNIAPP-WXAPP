/*
interface DynamicPager {
    page: number, // 原分页 page
    size: number, // 原 page size
    center: number, // 中间格子定位值
    num: number, // 上下展示的格子数量
    total: number // 原 总数据量
}
*/

interface ReportPageDeploy {
    path: string,
    code: SN,
    pager: DynamicPager,
    view: MANY, // 临时缓存的数据，只缓存 pager.num * 2 行数据
    schemas: ReportSchema[], // 这是个大数据
}

type REPORT_PAGE_DEPLOYS = { [k: string]: ReportPageDeploy }

// 这里只是做一个仓库的储存，
// 是页面更新单方面 储存到这里
// 这里再同步到磁盘
// 这里的数据，绝对不能跟页面进行双向同步，否则页面刷新压力会大
// 这里使用 getters 取值就好
interface ReportDataPageDeployStore {

    // 磁盘内的
    deploys_stone: REPORT_PAGE_DEPLOYS,

    // 活跃的
    // 多少个激活页面，就会有多少个depolys
    // 用户可以根据 某个 depoly，光速还原页面 
    deploys: REPORT_PAGE_DEPLOYS,

    // 当前 code
    code: string,

    // schemas
    // code: schema 组合的数组
    schemas: REPORT_SCHEMAS,

    // 缓存数据
    caches: REPORT_DATA_TABLE_CACHES
}


type REPORT_DATA_PAGE_STORE_FIELD = 'schemas' | 'code' | 'deploys' | 'deploys_stone'

type REPORT_DATA_PAGE_STORE_DISPATCH = 'change' | 'get_deploy' | 'set_deploy' | 'init_schema'

interface ReportDataPageDeployDispatch {
    change: Function,
    get_deploy: Function,
    set_deploy: Function,
    init_schema: Function,
}