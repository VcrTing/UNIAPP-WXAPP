import { NET_ERRORS_TXT } from "@/conf/conf-net";
import { _TYPE_OBJECT } from "../util/typed";
import { goLogin } from "../router/router";
import { promise } from "../util/future";

const _HTTP_CODE_SAFE: number = 399

// 响应式 网络 错误
const ser_err_txt = (origin: string = ''): string => {
    let res = NET_ERRORS_TXT[ origin.toString().trim() ]
    if (origin == 'Internal Server Error') goLogin()
    if (origin) return res ? res : origin
    return res ? res : '网络连接错误，属于未捕捉到的异常。'
}

// 雪莲花 后端返回 格式
const ser_result = (src: Object = { }) : NET_RES => {
    // console.log('后端返回 = ', src)

    const _dt = src as HttpResultBackend;
    const code: number = _dt.code
    const result: ONE | MANY | null = _dt.result

    // 安全返回
    if (_dt.code < _HTTP_CODE_SAFE && result) {
        return { result } as HttpResult
    } 

    // 非安全返回
    if (!result) return '[' + code + '] 返回结果为 NULL，MSG = ' + _dt.message
    // 错误
    return '[' + code + '] ' + ( _dt.message ? ser_err_txt( _dt.message ) : 'WEB后端 网络请求 未返回任何错误信息。' )
}

// 要不返回 string 错误信息，
// 要不强行封装属于自己的返回结果 { result }

// 处理成功
export const netser_succ = (src: ONE): NET_RES => {

    const code: number = src.statusCode ? src.statusCode : 404
    const data: string | AnyObject | ArrayBuffer | undefined = src.data ? src.data : undefined

    // console.log('data type =', (typeof data), (data instanceof String), (data instanceof ArrayBuffer))

    // 安全返回
    if (code < _HTTP_CODE_SAFE) {

        if (typeof data === _TYPE_OBJECT) {
            return ser_result(data)
        }
        else {
            if (data instanceof String) {
                console.log('一般返回格式，string，res =', data)
                return { result: data } 
            }
            else if (data instanceof ArrayBuffer) {
                console.log('稀有返回格式，ArrayBuffer，res =', data)
                return { result: data } 
            }
            
            if (typeof data === 'undefined') {
                console.log('稀有返回格式，undefined，res =', data)
            }
        }
    } 
    // 非安全返回
    else {
        console.log('接口请求 出错 = ', data)
        if (data instanceof Object) {
            const _dt: ONE = data as ONE
            return _dt.error ? '[' + code + ']' + ser_err_txt( _dt.error ) : '[' + code + '] WEB后端 网络请求 未返回任何错误信息。'
        }
    }
    // 无捕捉异常
    return '[500][SUCC_CALLBACK] 返回未处理 / 捕捉到网络请求的，未知类型错误！！！'
}

// 处理失败
export const netser_err = (err: ONE): NET_RES => {
    console.log('Uni.Promise 出错 = ', err)

    if (err) {
        const uniErr: UniAppHttpError = err as UniAppHttpError
        return uniErr.errMsg ? ser_err_txt( uniErr.errMsg ) : 'UNI_APP 网络请求 未返回任何错误信息。'
    } 
    else {
        console.log('捕捉到网络请求的，未知类型错误！！！')
    }
    // 未处理
    return '[500][ERR_CALLBACK] 返回未处理 / 捕捉到网络请求的，未知类型错误！！！'
}

// 处理 promise
export const netser = async (promise: Promise<UniApp.RequestSuccessCallbackResult>) : NET_RES_PROMISE => {
    try {
        const src: UniApp.RequestSuccessCallbackResult = await promise;
        return netser_succ( src )
    } 
    catch (err: any) {
        return netser_err( err )
    }
}