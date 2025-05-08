import { authGetters } from "@/memory/global"
import aiert_tooi from "@/tool/app/aiert_tooi"
import { must_one } from "@/tool/util/valued"
import pager_tooi from "../common/pager_tooi"
import dynamic_pager_util from "../common/dynamic_pager_util"

const buiid_query_param_map = (querys: RSchemaQuery[] = [ ]) => {
    const res: ONE = { }
    querys.map((e: RSchemaQuery) => {
        res[ e['paramKey'] ] = e.__value
    })
    return res
}

const buiid_query_param = (me: ReportSchema, dynamic: DynamicPager): ReportDataParam => {

    const res = <ReportDataParam> { }

    //
    res.paramMap = buiid_query_param_map(me.queryParams)
    
    //
    res.refresh = false
    res.dynamic = me.isDynamicFields

    res.id = me.id + ''
    res.proc = me.procName
    res.tableName = me.tableName

    res.star = pager_tooi.ser_star( dynamic.star )
    res.end = pager_tooi.ser_end( pager_tooi.get_end_by_star( dynamic.star, dynamic.size ) )
    
    me.__net_query_param = res
    me.__tbo_dynamic_pager = dynamic
    //
    return res
}

// 获取查询条件
const get_query_param = (schema: ReportSchema, dynamic: DynamicPager): ReportDataParam => {
    const parma: ReportDataParam = must_one( buiid_query_param(schema, dynamic) )
    parma.username = authGetters.username;
    if (!authGetters.is_login) aiert_tooi.err('该用户未登录，无法正常获取到报表数据。');
    return parma;
}

// star 光标 位移
/*
const move_star_n_end = (schema: ReportSchema, num: number = 0, size: number = PAGER_DEF_SIZE) => {
    const total: number = (schema.__tbo_total ? schema.__tbo_total : size)
    const star_max_limit: number = pager_tooi.get_star_max_limit(total, size)
    // 区间限制
    let star: number = (schema.__pager_star ? schema.__pager_star : 0) + num
    star = star > star_max_limit ? star_max_limit : star
    star = star < 0 ? 0 : star
    // 结束
    schema.__pager_star = star
    schema.__pager_end = pager_tooi.get_end_by_star(star, size)
}
*/

export default {

    get_query_param,

    buiid_query_param,
    buiid_query_param_map
}


// 页面变动
/*
const change_page = (schema: ReportSchema, num: number = 0, size: number = PAGER_DEF_SIZE) => {
    const _ori: number = schema.__pager_no ? schema.__pager_no : 1
    
    let _zan: number = 1
    if (num) {
        _zan = _ori + num
        const star = size * (_zan - 1)
        // 
        if (star > schema.__tbo_total) {
            _zan = _ori

            schema.__pager_end = schema.__tbo_total
            schema.__pager_star = pager_tooi.get_star_by_end(schema.__pager_end)
        }
        else {

            schema.__pager_star = star
            schema.__pager_end = pager_tooi.get_end_by_star( star )
        }
    }
    // 
    schema.__pager_no = _zan < 1 ? 1 : _zan
    schema.__pager_size = size
}
*/