
// 报表 公共 接口 参数
interface ServerReportListParam {    
    reportId: string,
    tableName: string,
    levelName: string,
    procName: string,
    pageNo: number,
    pageSize: number,
    column: string,

    paramMap: ONE,
    fieldsMap: ONE,
    isCache: BOOL,
    order: ORDER_BY,
    isDynamicFields: BOOL,
}