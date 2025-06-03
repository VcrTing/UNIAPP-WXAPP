
interface UniAppHttpError {
    errMsg: string
}

interface UniappHttpResult {
    data: HttpResult
    errMsg: string
    statusCode: number
}

interface HttpResult {
    data: ONE | MANY
    meta: HttpResultPagination
}

interface HttpResultPagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

type HttpResultBackend = UniappHttpResult

type NET_RES = HttpResult | string

type NET_RES_PROMISE = Promise<NET_RES>
