
type REPORT_SCHEMAS = { [k: string]: ReportSchema[ ] }

interface ReportSchemaOrigin {
    id: number,
    code: number,
    tableName: string,

    fieldsMap: string,
    isDynamicFields: string,
    isImmediatelyQuery: string,

    isLinkForm: string,
    linkFormId: string,
    linkFormParam: string,

    levelName: string,
    levelNo: number,

    procName: string,
    queryParams: RSchemaQueryOrigin[ ],

    sapApiName: string,
}

interface ReportSchema {
    id: number,
    code: stirng,
    tableName: string,

    fieldsMap: ONE,
    isDynamicFields: boolean,
    isImmediatelyQuery: boolean,

    isLinkForm: boolean,
    linkFormId: string,
    linkFormParam: string,

    levelName: string,
    levelNo: number,

    procName: string,
    queryParams: RschemaQuery[ ],

    sapApiName: string,

    __tab_name: string,
    __tab_iive: boolean,

    // __pager_no: number, // 分页页面
    // __pager_size: number, // 分页尺寸

    __net_query_param: ReportDataParam,
    __tbo_columns: OTableColumn[], // 表单的 列缓存数据
    __tbo_total: number, // 表单总数据

    __tbo_dynamic_pager: DynamicPager, // 该表单的 动态分页数据
    
    __tbo_sort_key: string, // 排序 KEY
    __tbo_sort_value: string, // 排序 值
}


interface RSchemaQueryOrigin {
    alertKeysMap: string
    alertSql: string
    company: string
    defaultValue: SN
    isHide: string
    isRequired: string
    options: string
    paramKey: string
    paramValue: string
    priority: number
    reportId: number
    type: string

    resOptions: ONE | MANY | undefined
    resAlertKeysValue: ONE | undefined
}
interface RSchemaQuery {
    alertKeysMap: ONE
    alertSql: string
    company: string
    defaultValue: SN
    isHide: boolean
    isRequired: boolean
    options: ONE | MANY
    paramKey: string
    paramValue: string
    priority: number
    reportId: number
    type: string

    __label: string,
    __type: string,
    __value: SN
    __value_def: SN
    __disable: boolean
}

// 表格列信息
interface OTableColumnOrigin {
    align: string,
    dataIndex: string,
    title: string,
    width: number,
    freeze: boolean
}
// 表格信息
interface ReportDataTableMsgOrigin {
    columns: OTableColumnOrigin[],
    fields: string[],
    total: number
}

