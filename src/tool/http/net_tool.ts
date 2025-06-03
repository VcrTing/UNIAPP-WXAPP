

const PAGER_SIZE_DEF = 10

const generate_pagination = (pageSize: number = PAGER_SIZE_DEF): Pager => {
    return <Pager>{
        page: 1, pageSize
    }
}

const build_strapi_pager = (pager: Pager) => {
    return {
        'pagination[page]': pager.page || 1,
        'pagination[pageSize]': pager.pageSize || PAGER_SIZE_DEF
    }
}

export default {
    generate_pagination,

    build_strapi_param: (param: ONE, pager: Pager, relations: string[]) => {
        let res = <ONE>{ ...param, ...build_strapi_pager(pager) }
        relations.map(e => {
            res['populate[' + e + '][fields]'] = '*';
            return e;
        });
        return res;
    }
}