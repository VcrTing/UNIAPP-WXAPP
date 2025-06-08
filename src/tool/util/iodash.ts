import { has_v, must_arr, must_one } from "./valued";

export const arrhas = (arr: ANYS, v: SN = ''): boolean => (arr.indexOf(v) > -1);


export const arrfindi = <T>(arr: T[], tar: number | string, k: string = 'idx'): number => {
    let _i = -1
    for (let i= 0; i< arr.length; i++ ) {
        if ((arr[i] || { })[k] == tar) {
            _i = i
        }
    }
    return _i
}
export const arrfind = <T>(arr: T[], tar: number | string, k: string = 'idx'): T => (arr[ arrfindi(arr, tar, k) ])

export const onecopy = (target: ONE, source: ONE): ONE => {
	for (const k in source) { target[ k ] = source[ k ] }
    return target
}

export const arrimit = <T>(src: MANY, imit: number): T => {
    src = src || [ ]
    imit = imit || 1
    const res = [ ]
    for (let j= 0; j< src.length; j++ ) {
        if (j < imit) {
            res.push(src[j])
        }
    }
    return (res as T)
}

export const arrgotv = (src: MANY, k: string = 'documentId') => {
    return must_arr(src).map((e: ONE) => e[k]) //.filter(v => has_v(v))
}

export const arrsort = <T>(src: T, k: string, ahead_small: boolean = false) => {
    return must_arr(src).sort((a: ONE, b: ONE) => {
        return ahead_small ? 
            (a[k] || 0) - (b[k] || 0) :
            (b[k] || 0) - (a[k] || 0)
    })
}