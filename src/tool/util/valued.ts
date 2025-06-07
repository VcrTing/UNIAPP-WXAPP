
export const is_nice_sn = (sn: SN | undefined) => (sn != undefined && sn != null && sn != '')

export const is_nice_arr = (arr: ANYS | undefined) => (arr && arr.length > 0)
export const is_nice_one = (one: ONE | undefined | null) => { 
    if (!one) return false
    if (one instanceof Array) return false
    for (const k in one) { return true } return false }

export const cnv_str_bool = (str: string | undefined = undefined): boolean => {
    if (!str) return false
    if (str.startsWith('1')) return true
    if (str.startsWith('true')) return true
    return false
}

export const cnv_bool_str = (bool: boolean = false): string => bool ? 'true' : 'false'

export const must_arr = (src: any) => {
    if (src && (src instanceof Array)) return src;
    if (is_nice_one(src)) return [ src ];
    return src ? [ src ] : [ ]
}
export const must_one = <T>(src?: ONE): T => {
    if (!src) return <T>{ }
    if (src instanceof Array) return <T>{ }
    for (const k in src) { return src as T } return <T>{ }
}

export const must_int = (src: any) => {
    if (src == null || src == undefined) return 0;
    try {
        if (src === true) { return 1 }
        else if (src === false) { return 0 }
        return Number.parseInt(src)
    }
    catch(e) {
        return 0
    }
}

export const positive = (v: number, def: number = 0) => (v < 0 ? def : v)

export const has_v = (v: any) => (v != null && v != undefined && v == '')

export const formfii = (form: ONE, data: ONE | null) => {
    if (form && data) {
        for (let k in form) {
            const v = data[ k ]
            if (v != null || v != undefined) {
                form[k] = v
            }
        }
    }
}

export const deepcopy = (src: any) => JSON.parse(JSON.stringify(src))

export const formfiimit = (form: ONE, data: ONE, fileds: string[]) => {
    for (let k in data) {
        fileds.map((__k) => {
            if (__k == k) {
                const v = data[ k ]
                if (v != null || v != undefined) {
                    form[k] = v
                }
            }
        })
    }
}