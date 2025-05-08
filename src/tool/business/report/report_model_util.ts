
// 雪莲花 结构

import tbo_tooi, { TBO_SORT_KEY_DEF } from "@/tool/app/tbo_tooi"
import jsoner from "@/tool/util/jsoner"
import { must_arr, cnv_str_bool, must_one } from "@/tool/util/valued"

const ser_schema_query = (src: RSchemaQueryOrigin): RSchemaQuery => {
    const res = <RSchemaQuery> { }
    
    if (src.alertKeysMap) {
        // console.log('-----------------------------')
        // console.log('alertKeysMap 1 =', src.alertKeysMap)
        res.alertKeysMap = must_one( 
            // jsoner.parse( src.alertKeysMap ) 
            src.resAlertKeysValue
        )
        // console.log('alertKeysMap 2 =', jsoner.parse( src.alertKeysMap ))
    }

    res.alertSql = src.alertSql
    res.company = src.company
    res.defaultValue = src.defaultValue
    res.isHide = cnv_str_bool( src.isHide )
    res.isRequired = cnv_str_bool( src.isRequired )
    res.options = src.resOptions ? src.resOptions : [] // jsoner.parse( src.options )
    res.paramKey = src.paramKey
    res.paramValue = src.paramValue
    res.priority = src.priority
    res.reportId = src.reportId
    res.type = src.type

    // 自家
    res.__type = src.type
    res.__label = src.paramValue
    res.__value = src.defaultValue
    res.__disable = false
    res.__value_def = src.defaultValue

    // 
    return res
}

const ser_schema = (src: ReportSchemaOrigin): ReportSchema | undefined => {

    if (!src) return undefined

    const res = <ReportSchema> { }

    res.id = src.id
    res.code = src.code + ''
    res.tableName = src.tableName
    if (src.fieldsMap) {
        res.fieldsMap = jsoner.parse( src.fieldsMap)
    }
    res.isDynamicFields = cnv_str_bool(src.isDynamicFields)
    res.isImmediatelyQuery = cnv_str_bool(src.isImmediatelyQuery)
    res.isLinkForm = cnv_str_bool(src.isLinkForm)
    res.levelName = src.levelName
    res.levelNo = src.levelNo

    res.procName = src.procName
    res.sapApiName = src.sapApiName
    if (src.queryParams) {
        const _v: RSchemaQueryOrigin[ ] = must_arr(src.queryParams)
        res.queryParams = _v.map(e => ser_schema_query(e))
    }

    // 自家的
    res.__tab_name = src.levelName
    res.__tab_iive = false
    res.__tbo_columns = []
    res.__tab_sort_key = tbo_tooi.pkg_sort_key('')
    res.__tab_sort_value = tbo_tooi.pkg_sort_value('')
    res.__net_query_param = <ReportDataParam> { }
    //
    return res
}

// 获取 查询条件
const get_querys = (src: ReportSchema[]) => {
    
}

export default {
    ser_schema
}