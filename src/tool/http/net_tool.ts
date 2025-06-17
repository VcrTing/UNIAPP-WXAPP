import { is_strapi_mode } from "@/conf/conf"
import strapi_param_tool from "../strapi/strapi_param_tool"
import { authGetters } from "@/memory/global"
import { is_nice_arr, is_nice_one, must_arr, must_one } from "../util/valued"


const PAGER_SIZE_DEF = 10

// 生成返回结果
const generate_http_result = (data: any, code: number, message: string) => {
    return <HttpResult>{
        code, message, data
    }
}

// 生成分页
const generate_pagination = (pageSize: number = PAGER_SIZE_DEF): Pager => {
    return <Pager>{
        page: 1, pageSize, total: 999
    }
}

// 构建参数
const build_param = (param: ONE, pager: Pager, relations: string[]): ONE => {
    if (is_strapi_mode()) {
        return strapi_param_tool.build_param(param, pager, relations)
    }
    else {
        return { }
    }
}

// 规定为我的
const limit_mine = (param: ONE, relation_name: string = 'user') => {
    if (is_strapi_mode()) {
        const id: string = authGetters.userid || ''
        param['filters[' + relation_name + '][documentId][$eq]'] = id
    }
    else {

    }
}

// 规定 param
const build_data = (data: ONE) => {
    if (is_strapi_mode()) {
        return {
            data
        }
    }
    return data
}

// 解析返回结果
const data = <T>(src: NET_RES) => {
    return (src as HttpResult).data as T
}


const many = <T>(src: ONE | MANY | undefined): T[] => {
    return is_nice_arr(src) ? (must_arr(src) as T[]) : <T[]>[]
}
const one = <T>(src: ONE | MANY | undefined): T => {
    return is_nice_one(src) ? (must_one(src)) : <T>{ }
}

export default {
    generate_http_result,
    generate_pagination,
    build_param,
    limit_mine,
    build_data,
    data,
    one, many
}