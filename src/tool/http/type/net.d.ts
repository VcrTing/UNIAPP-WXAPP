
interface UniAppHttpError {
    errMsg: string
}

interface HttpResultBackend {
    code: number,
    message: string,
    result: null | ONE | MANY,
    // timestamp: number
    // success: boolean
}

interface HttpResult {
    result: ONE | MANY
}


type NET_RES = HttpResult | string

type NET_RES_PROMISE = Promise<NET_RES>
