
const PAGER_SIZE_DEF = 10

const build_param_pager = (pager: Pager) => {
    return {
        'pagination[page]': pager.page || 1,
        'pagination[pageSize]': pager.pageSize || PAGER_SIZE_DEF
    }
}


const build_param = (param: ONE, pager: Pager, relations: string[]) => {
    let res = <ONE>{ ...param, ...build_param_pager(pager) }
    relations.map(e => {
        res['populate[' + e + '][fields]'] = '*';
        return e;
    });
    return res;
}

const app_pager_to_strapi_pager = (pager: Pager) => {

}

const __sort = (target: ONE = { }, isasc: boolean = false) => {
    target['sort'] = 'createdAt:' + (isasc ? 'asc' : 'desc')
}

// {}, filters[id][$in], [ 0, 1 ]
const __eq = (target: ONE , key: string, v: string | number ) => {
    const __K: string = 'filters[' + key + '][$eq]'
    target[ __K ] = v
}
const __ne = (target: ONE , key: string, v: string | number ) => {
    const __K: string = 'filters[' + key + '][$ne]'
    target[ __K ] = v
}
const __like = (target: ONE , key: string, v: string | number ) => {
    const __K: string = 'filters[' + key + '][$contains]'
    target[ __K ] = v
}
const build_filter_in = (target: ONE , key_prefix: string, ins: any[] ) => {
    const __K: string = 'filters[' + key_prefix + '][$in]'
    ins.map((e, i) => {
        const k = __K + '[' + i + ']'
        target[k] = e
    })
    return target
}

export default {
    __eq, __ne, __like, __sort,
    build_filter_in,
    build_param_pager,
    build_param
}