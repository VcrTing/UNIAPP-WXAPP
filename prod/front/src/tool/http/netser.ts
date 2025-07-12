import { NET_ERRORS_TXT } from "@/conf/conf-net";
import { _TYPE_OBJECT, is_str } from "../util/typed";
import net_tool from "./net_tool";
import { is_nice_one, must_int } from "../util/valued";
import { for_net_when_401, for_net_when_403 } from "@/conf/__for_net/for_net_error";

const __HTTP_CODE_SAFE: number = 399
const __HTTP_CODE_FBD: number = 403
const __HTTP_CODE_TOKEN_FAIL: number = 401

// 响应式 网络 错误
const ser_err_txt = (origin: ONE | string = ''): string => {
    let res = ''
    console.log('ser_err_txt =', origin)
    if (is_str(origin)) {
        res = NET_ERRORS_TXT[ origin.toString().trim() ]
        // if (origin == 'Internal Server Error') goLogin()
        if (origin) return res ? res : origin.toString()
    }
    else {
        const o: ONE = origin as ONE
        if (o.message) {
            return o.message
        }
    }
    return res ? res : '网络连接错误，属于未捕捉到的异常。'
}

const ser_me_code = (src: ONE, tag: string) => {
    console.log('ser_me_code =', src)
    if (is_nice_one(src)) {
        const code: number = must_int(src.statusCode)
        if (code) {
            if (code === __HTTP_CODE_FBD) {
                // console.log('-------------- 处理 403 --------------')
                for_net_when_403(tag)
                return true
            }
            else if (code === __HTTP_CODE_TOKEN_FAIL) {
                for_net_when_401(tag)
                return true
            }
        } 
    }
    return false
}


// 处理成功
export const netser_succ = (src: ONE, tag: string): NET_RES => {

    const code: number = src.statusCode ? src.statusCode : 404
    const data: NET_RES = src.data ? src.data : undefined
    //
    console.log('请求 SUCCESS =', src)
    // console.log('data type =', (typeof data), (data instanceof String), (data instanceof ArrayBuffer))
    // 安全返回
    if (code < __HTTP_CODE_SAFE) {
        // 有数据
        if (data) {
            console.log('src.data =', data)
            // 返回数据是 string
            if (is_str(data)) {
                return net_tool.generate_http_result(data, 500, '错误')
            }
            // 返回数据是 object
            else {
                const __dt: HttpResult = data as HttpResult
                const __code: number | undefined = __dt.code
                const __msg: string = __dt.message || '没错误消息返回'
                if (__code) {
                    // 安全
                    if (__code < __HTTP_CODE_SAFE) {
                        // 最终返回
                        return data
                    }
                    // 错误
                    else {
                        if (ser_me_code(__dt, tag)) return ''
                        return '[500][SUCC_CONNECT] ' + __msg.substring(0, 255)
                    }
                }
                return data
            }
        }
        // 无数据处理
        else {
            return '[500][SUCC_CALLBACK] 返回无数据！！！'
        }
    } 
    // 非安全返回
    else {
        if (ser_me_code(src, tag)) return ''
        // console.log('接口请求 出错 = ', data)
        if (data instanceof Object) {
            const _dt: ONE = data as ONE
            return _dt.error ? '[' + code + ']' + ser_err_txt( _dt.error ) : '[' + code + '] WEB后端 网络请求 未返回任何错误信息。'
        }
    }
    // 无捕捉异常
    return '[500][SUCC_CALLBACK] 返回未处理 / 捕捉到网络请求的，未知类型错误！！！'
}

// 处理失败
export const netser_err = (err: ONE, tag: string): string => {
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
/*
const has_err = (src: ONE): boolean => {
    console.log('has_err =', src, src && src.errMsg)
    return src && src.errMsg
}
*/

// 处理 promise
export const netser = async (
    promise: NET_RES_PROMISE, // Promise<UniApp.RequestSuccessCallbackResult>
    tag: string
) : Promise<NET_RES> => {
    try {
        // UniApp.RequestSuccessCallbackResult
        const src: NET_RES = (await promise) as NET_RES;
        return is_str(src) ? src : (src as HttpResult)
    } 
    catch (err: any) {
        return netser_err( err, tag )
    }
}

// 雪莲花 后端返回 格式
/*
const ser_result = (src: Object = { }) : NET_RES | null => {
    const _dt = src as HttpResultBackend;
    const code: number = _dt.statusCode
    const result: NET_RES = _dt.data
    // 安全返回
    if (_dt.statusCode < __HTTP_CODE_SAFE && result) {
        return result; // { result } as HttpResult
    } 
    return null;
}
*/

// 要不返回 string 错误信息，
// 要不强行封装属于自己的返回结果 { result }

        /*
        if (typeof data === _TYPE_OBJECT) {
            return ser_result(data)
        }
        else {
            if (data instanceof String) {
                console.log('一般返回格式，string，res =', data)
                return { data: data } 
            }
            else if (data instanceof ArrayBuffer) {
                console.log('稀有返回格式，ArrayBuffer，res =', data)
                return { data: data } 
            }
            
            if (typeof data === 'undefined') {
                console.log('稀有返回格式，undefined，res =', data)
            }
        }
        */