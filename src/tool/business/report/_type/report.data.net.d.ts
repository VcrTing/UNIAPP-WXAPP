
// 对接后台的请求参数类型
interface ReportDataPageGetParam {
    column: string, // 目前是提取中文
    field?: string, // 目前
    fieldsMap: ONE,
    isCache: string,
    isDynamicFields: string,
    order: string,
    pageNo: number,
    pageSize: number,
    paramMap: ONE,
    procName: string,
    reportId: SN,
    tableName: string
}

// 获取数据的传参
interface ReportDataParam {
    id: string,
    proc: string,
    username: string,

    tableName: string,

    // page: number,
    // size: number,
    star: number,
    end: number,

    sortKey: string,
    sortValue: string,

    dynamic: boolean,
    refresh: boolean,

    paramMap: ONE
}
/*
column
: 
""
field
: 
"id,,#,订单号,创建日期,订单类型,订单状态,客户代码,客户名称,部门,业务员,路线,货号,色名,色号,销售单位,销售单价,销售数量,币别,人民币金额,币别金额,客户交货日期,税码,年份,季别,客户合同号,客户面料,对应客户名称,对应客户集团,供应商代码,供应商名称,取消原因,采购订单,采购订单取消原因,客户集团,客户类别,客户属性,米"
fieldsMap
: 
{param1_0_120_0_1_2_{'DocEntry':'订单号'}_0_{'DocEntry':'订单号'}_0: "订单号", param0_0_120_0_0_0_0_0: "创建日期",…}
isCache
: 
"false"
isDynamicFields
: 
"false"
order
: 
"desc"
pageNo
: 
1
pageSize
: 
500
paramMap
: 
{Bdate: "", Edate: "", BM: "", SaleMan: "", CardCode: "", CardName: "", ItemCode: "", ColorC: "",…}
procName
: 
"SBO_WEB_A020"
reportId
: 
56
tableName
: 
"销售订单-表单"
*/