import { must_arr } from "../util/valued"

export const getgallery = (v: ONE, def: MANY, k: string = 'gallery'): MANY => {
    const src = must_arr(v[ k ])
    const _len = src.length;
    if (_len > 0) {
        if (_len > 3) {
            return src.slice(0, 3)
        }
        return src;
    } 
    return def
}