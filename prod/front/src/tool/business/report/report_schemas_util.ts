import server_report_schema from "@/server/report/server_report_schema"
import { is_nice_arr, is_nice_one } from "@/tool/util/valued"
import { storage } from "@/tool/web/storage"
import report_model_util from "./report_model_util"
import aiert_tooi from "@/tool/app/aiert_tooi"
import tbo_tooi from "@/tool/app/tbo_tooi"

const _REPOET_WAREHOUSE_PREFIX = "REPOET_WAREHOUSE_STORE_"
 
const __storage = {
    get: (): REPORT_SCHEMAS | undefined => storage.get(_REPOET_WAREHOUSE_PREFIX + 'schemas'),
    set: (ss: REPORT_SCHEMAS) => storage.set(_REPOET_WAREHOUSE_PREFIX + 'schemas', ss)
}

// 取出某个结构
// 磁盘穿透
const get_schema = (state: ReportDataPageDeployStore, code: string | undefined): ReportSchema[] | undefined => {
    if (code) {
        /*
        // 先从内存获取
        let schemas: REPORT_SCHEMAS | undefined = state.schemas
        if (schemas && is_nice_one(schemas)) {
            console.log('内存内的schemas =', schemas)
            return schemas[ code ]
        }
        // 内存没有，从磁盘内获取
        else {
        }
        */
        let schemas: REPORT_SCHEMAS | undefined = __storage.get()
        if (schemas && is_nice_one(schemas)) {
            state.schemas = schemas
            console.log('磁盘内的schemas =', schemas)
            return schemas[ code ]
        }
        else {
            console.log('这个结构，磁盘里都没有，code =', code)
        }
    }
    else aiert_tooi.err('report_schemas_util.actions.__get_schema 没传入 code')
    return undefined
}

// 保存 某个 结构
// 并且刷新到，磁盘
const save_schemas = (state: ReportDataPageDeployStore, code: string | undefined, v: ReportSchema[]): boolean => {
    if (code && is_nice_arr(v)) { 
        state.schemas[ code ] = v
        let schemas: REPORT_SCHEMAS | undefined = __storage.get()
        if (schemas) {
            schemas[ code ] = v
        } 
        else {
            schemas = state.schemas
        }
        console.log('同步到磁盘的 schemas =', state.schemas)
        // 刷新 磁盘
        if (schemas ) __storage.set(schemas); return true
    }
    return false
}

// 初始化 schemas
// 先为某个页面获取 schemas
// 然后根据 code: schemas 结构，存到内存 + 磁盘
const init_schemas = async (state: ReportDataPageDeployStore, code: string | undefined): Promise<ReportSchema[] | undefined> => {
            
	console.log('切换 schemas code =', code)
    // 只从磁盘 内获取了
    const schema: ReportSchema[] | undefined = get_schema(state, code)
	console.log('磁盘 schema =', schema)
    if (schema && is_nice_arr(schema)) { return schema }

    // 磁盘里没有，只能从网络获取
    const res: MANY = await server_report_schema.schemas( code )
    if (is_nice_arr(res)) {

        const __src: ReportSchemaOrigin[] = res as ReportSchemaOrigin[ ]
        const __res: ReportSchema[] = [ ]

        // 多个进行 序列化
        __src.map((e: ReportSchemaOrigin) => {
            // console.log('雪莲花 之前的 schema =', e)
            const _one: ReportSchema | undefined = report_model_util.ser_schema(e)
            // console.log('雪莲花 之后的 schema =', _one)
            if (_one && is_nice_one(_one)) { __res.push(_one) }
        })     

        // 储存 + 返回
        if (is_nice_arr(__res)) {
            // 第 0 个主动展示
            __res[0].__tab_iive = true
            save_schemas(state, code, __res)
            return __res
        }
        else {
            aiert_tooi.err('序列化 Schema origin 失败: ' + __res)
        }
    }
    else {
        // console.log('网络连接错误，没有 origins')
    }
    // 啥都没获取到
    return undefined
}


// 更新数据
const change_table_msg = (schema: ReportSchema, columns: OTableColumnOrigin[], total: number = 0) => {
    if (is_nice_arr(columns)) {
        schema.__tbo_columns = tbo_tooi.ser_columns(columns)
    }
    schema.__tbo_total = total
    console.log('改变表单的 TR =', columns.length, total)
}

export default {
    get_schema,
    save_schemas,
    init_schemas,

    change_table_msg
}