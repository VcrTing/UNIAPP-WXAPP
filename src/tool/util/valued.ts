
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

export const must_arr = (src: any) => ( src && (src instanceof Array) ) ? src : [ ]
export const must_one = <T>(src: ONE | undefined | null): T => {
    if (!src) return <T>{ }
    if (src instanceof Array) return <T>{ }
    for (const k in src) { return src as T } return <T>{ }
}