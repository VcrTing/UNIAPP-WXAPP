import { promise } from "../util/future"
import { netser, netser_err, netser_succ } from "./netser"

const error = (error: string = '网络连接错误。'): Promise<UniApp.RequestSuccessCallbackResult> => new Promise( resolve => resolve({
    statusCode: 500,
    data: { error },
    header: { },
    cookies: [ ]
}))

class NeTooi {
    // 组装 uri
    // 注意，有没有 / 尾巴有时候也会出错
    _uri(api: string, endpoint: string, suffix: string | null = ''): string { return api + '/' + endpoint + (suffix ?  '/' + suffix : '') }

    _headers (jwt: string | null, isF: boolean = false): ONE { 
        // const boundary = '----WebKitFormBoundary' + Math.random().toString(16).substring(2);
        // ; boundary=${boundary}
        const res = <ONE>{ 
            'Content-Type': isF ? `multipart/form-data` : 'application/json' 
        }
        if (jwt) { 
            // res['Authorization'] = 'Bearer ' + jwt 
            // res['X-Access-Token'] = jwt
            // res['VcrTing-Token'] = jwt
            // res['Access-Control-Request-Headers'] = jwt
        } 
        return res 
    }
    _params (condition: any, res: string = '?'): string {  
        if (JSON.stringify(condition) != '{}') { 
            for (const k in condition) { res += ( k + '=' + condition[k] + '&' ) }
        } return res }

    _config (
        method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
        url: string,
        data: ONE,
        header: ONE, 
        timeout: number
    ) { return { url, data, method, header, timeout, dataType: 'json' } }

    TIMEOUT;
    TIMEOUT_S;
    constructor(timeout_get: number, timeout_pos: number) { this.TIMEOUT = timeout_get; this.TIMEOUT_S = timeout_pos; }

    /**
     * 组装方便的 config
     * @param url 
     * @param params 
     * @param jwt 
     * @param is_file 
     * @returns 
     */
    _config_get(url: string, params: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('GET', url, params ? params : {}, this._headers(jwt, is_file), this.TIMEOUT)
    }
    _config_pos(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('POST', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
    _config_put(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('PUT', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
    _config_dei(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('DELETE', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
}

class Net extends NeTooi {

    // 网站后端 domain
    domain;
    // 存放 endpoints 的 MAP
    endpoints;
    // 获取 JWT 的方法
    jwt;
    // 是否 打印
    is_log;

    constructor(api: string, endpoints: ONE, jwt: () => string, timeout_get: number, timeout_pos: number, is_log: boolean) {
        super(timeout_get, timeout_pos);
        this.domain = api; this.endpoints = endpoints; this.jwt = jwt;
        this.is_log = is_log;
    }

    // 创建 URL
    build_url(url_name: string, url_suffix: string | null = '') { return this._uri(this.domain, this.endpoints[url_name], url_suffix); }

    // 里面使用 uni.request 作请求
    adapter (config: UniApp.RequestOptions): NET_RES_PROMISE {
        return new Promise(resolve => {
            uni.request({
                ...config,
                fail: (err) => resolve( netser_err( err ) ),
                success: (res) => {
                    resolve( netser_succ( res ) );
                },
            })
        })
    }

    /**
     * GET
     */
    get (
        url_name: string, 
        url_suffix: string | null, 
        params: ONE | null
    )
    : NET_RES_PROMISE
    {
        // 请求 URL
        const __url: string = this.build_url(url_name, url_suffix);
        // 请求 配置
        const __config: UniApp.RequestOptions = this._config_get(__url, params ? params : { }, this.jwt(), false);
        if (this.is_log) {
            console.log("GET", __url, __config)
        }
        // 返回
        return this.adapter(__config);
    }

    pos (url_name: string, url_suffix: string | null, data: ONE | null, is_file: boolean = false): NET_RES_PROMISE {
        // 请求 URL
        const __url: string = this.build_url(url_name, url_suffix)
        // 请求 配置
        const __config: UniApp.RequestOptions = this._config_pos(__url, data, this.jwt(), is_file)
        if (this.is_log) {
            console.log("POST", __url, __config)
        }
        // 返回
        return this.adapter(__config);
    }

    put (url_name: string, url_suffix: string | null, data: ONE | null): NET_RES_PROMISE {
        console.log('url_suffix =', url_suffix)
        // 请求 URL
        const __url: string = this.build_url(url_name, url_suffix)
        // 请求 配置
        const __config: UniApp.RequestOptions = this._config_put(__url, data, this.jwt(), false)
        if (this.is_log) {
            console.log("PUT", __url, __config)
        }
        // 返回
        return this.adapter(__config);
    }
    
    del (url_name: string, url_suffix: string | null, data: ONE | null): NET_RES_PROMISE {
        // 请求 URL
        const __url: string = this.build_url(url_name, url_suffix)
        // 请求 配置
        const __config: UniApp.RequestOptions = this._config_pos(__url, data, this.jwt(), false)
        if (this.is_log) {
            console.log("DELETE", __url, __config)
        }
        // 返回
        return this.adapter(__config);
    }
    
    uio (url_name: string, url_suffix: string | null, data: FormData): NET_RES_PROMISE {
        // 请求 URL
        const __url: string = this.build_url(url_name, url_suffix)
        // 请求 配置
        const __config: UniApp.RequestOptions = this._config_pos(__url, data, this.jwt(), true)
        if (this.is_log) {
            console.log("UPLOAD", __url, __config)
        }
        // 返回
        return this.adapter(__config);
    }
}

export default Net;