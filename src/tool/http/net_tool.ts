import { is_strapi_mode } from "@/conf/conf"
import strapi_param_tool from "../strapi/strapi_param_tool"
import { authGetters } from "@/memory/global"


const PAGER_SIZE_DEF = 10

// 生成分页
const generate_pagination = (pageSize: number = PAGER_SIZE_DEF): Pager => {
    return <Pager>{
        page: 1, pageSize
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
        const id: number = authGetters.userid || 0
        param['filters[' + relation_name + '][id][$eq]'] = id
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

export default {
    generate_pagination,
    build_param,
    limit_mine,
    build_data
}