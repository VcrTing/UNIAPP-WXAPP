import { reportDPDispatch, reportDPState } from "@/pages/report/_memory/report-page-deploy-store"
import aiert_tooi from "@/tool/app/aiert_tooi"
import { is_nice_one } from "@/tool/util/valued"

// 从缓存内获取数据
const get_data_in_cache = (report_id: SN): ReportDataTableCache | undefined => {
    const caches: REPORT_DATA_TABLE_CACHES = reportDPState.caches
    const cache: ReportDataTableCache = caches[ report_id ]
    return is_nice_one(cache) ? cache : undefined
}

// 把缓存的数据替换给 schema
const repalce_data_to_schema = (cache: ReportDataTableCache, schema: ReportSchema) => {
    if (cache.id == schema.id) {
        schema.__tbo_columns = cache.columns
        schema.__tbo_total = cache.total
        schema.__tbo_dynamic_pager = cache.pager
    }
    else aiert_tooi.err('拉取到的缓存数据内的 ID 与报表 ID 不一致')
}

export default {
    get_data_in_cache,
    repalce_data_to_schema
}