import { must_arr } from "./valued";

export const arrhas = (arr: ANYS, v: SN = ''): boolean => (arr.indexOf(v) > -1);

export const arrfind = (arr: MANY, idx: number): number => {
    let _i = -1
    for (let i= 0; i< arr.length; i++ ) {
        if (arr[i]['idx'] == idx) {
            _i = i
        }
    }
    return _i
}

export const onecopy = (target: ONE, source: ONE): ONE => {
	for (const k in source) { target[ k ] = source[ k ] }
    return target
}

export const arrimit = (src: MANY, imit: number) => {
    src = src || [ ]
    imit = imit || 1
    const res = [ ]
    for (let j= 0; j< src.length; j++ ) {
        if (j < imit) {
            res.push(src[j])
        }
    }
    return res
}

export const arrsort = <T>(src: T, k: string, ahead_small: boolean = false) => {
    return must_arr(src).sort((a: ONE, b: ONE) => {
        return ahead_small ? 
            (a[k] || 0) - (b[k] || 0) :
            (b[k] || 0) - (a[k] || 0)
    })
}