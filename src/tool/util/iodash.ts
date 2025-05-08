
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